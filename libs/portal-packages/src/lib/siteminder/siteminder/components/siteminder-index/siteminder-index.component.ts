import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderStore, NgSiteMinderActions, NgSiteMinderChannelsStore, NgSiteMinderRatePlansStore, NgSiteMinderRatePlansActions, NgSiteMinderChannelsActions, NgSiteMinderChannelManagerStore } from '@skysmack/ng-siteminder';
import { SiteMinderAppState, SITE_MINDER_AREA_KEY, SiteMinderUi } from '@skysmack/packages-siteminder';
import { BaseComponent } from '@skysmack/portal-fields';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { LodgingColumn } from '../../../models/lodging-column';
import { map, tap, debounceTime, distinctUntilChanged, switchMap, filter, take } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { PagedQuery } from '@skysmack/framework';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { RateplanColumn } from '../../../models/rateplan-column';
import { ChannelColumn } from '../../../models/channel-column';
import { SiteminderRow } from '../../../models/siteminder-rows';
import { SiteminderCell } from '../../../models/siteminder-cell';
import { LodgingCell } from '../../../models/lodging-cell';
import { RateplanCell } from '../../../models/rateplan-cell';
import { ChannelCell } from '../../../models/channel-cell';

@Component({
  selector: 'ss-siteminder-index',
  templateUrl: './siteminder-index.component.html',
  styleUrls: ['./siteminder-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteMinderIndexComponent extends BaseComponent<SiteMinderAppState, unknown> implements OnInit {
  public static COMPONENT_KEY = 'siteminder-index';
  public componentKey = SiteMinderIndexComponent.COMPONENT_KEY;
  public areaKey: string = SITE_MINDER_AREA_KEY;

  @ViewChild('entityList', { static: true }) public entityList: CdkVirtualScrollViewport;

  @ViewChild('lodgingTemplate', { read: TemplateRef, static: true }) template: TemplateRef<any>;

  public lodgingColumns$: Observable<LodgingColumn[]>;
  public siteminderRows$: Observable<SiteminderRow[]>;
  public uiOptions$: Observable<SiteMinderUi>;

  public from$ = new BehaviorSubject<Date>(new Date());
  public to$: BehaviorSubject<Date>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgSiteMinderActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgSiteMinderStore,
    public title: EntityComponentPageTitle,
    private lodgingTypesStore: NgLodgingTypesStore,
    private lodgingTypesActions: NgLodgingTypesActions,
    private ratePlansStore: NgSiteMinderRatePlansStore,
    private ratePlansActions: NgSiteMinderRatePlansActions,
    private channelsStore: NgSiteMinderChannelsStore,
    private channelsActions: NgSiteMinderChannelsActions,
    private channelManagerStore: NgSiteMinderChannelManagerStore
  ) {
    super(router, activatedRoute, skysmackStore, title);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle('Rate & Restrictions Manager');
    
    let end = new Date();
    end.setDate(end.getDate() + 30);
    this.to$ = new BehaviorSubject<Date>(end);

    const lodgingPackagePath$ = getPackageDendencyAsStream(this.skysmackStore, this.packagePath, [0, 1, 0]).pipe(
      filter(x => !!x),
      debounceTime(10),
      map(_package => _package.object.path),
      distinctUntilChanged(),
      tap(() => console.log('lodgingPackagePath'))
    );

    this.uiOptions$ = this.store.getUiState(this.packagePath).pipe(debounceTime(10));
    
    this.ratePlansActions.getPaged(this.packagePath, new PagedQuery());
    this.channelsActions.getPaged(this.packagePath, new PagedQuery());

    this.subscriptionHandler.register(
      lodgingPackagePath$.pipe(
        tap(lodgingPackagePath => this.lodgingTypesActions.getPaged(lodgingPackagePath, new PagedQuery())),
        take(1)
      ).subscribe());

    this.lodgingColumns$ = lodgingPackagePath$.pipe(
      switchMap(lodgingPackagePath =>
        combineLatest(
          this.lodgingTypesStore.get(lodgingPackagePath).pipe(take(1), tap(() => console.log('lodgingTypesStore'))),
          this.ratePlansStore.get(this.packagePath).pipe(take(1), tap(() => console.log('ratePlansStore'))),
          this.channelsStore.get(this.packagePath).pipe(take(1), tap(() => console.log('channelsStore')))
        ).pipe(
          debounceTime(50),
          map(([lodgings, rateplans, channels]) =>
            lodgings.map(lodging => {
              return new LodgingColumn({
                id: lodging.object.id, title: lodging.object.name, rateplans: rateplans.map(rateplan =>
                  new RateplanColumn({
                    id: rateplan.object.id, title: rateplan.object.name, channels: channels.map(channel =>
                      new ChannelColumn({ id: channel.object.id, title: channel.object.name }))
                  }))
              });
            }
            )
          ),
          tap(() => console.log('lodgingColumns'))
        ))
    );

    this.subscriptionHandler.register(combineLatest(
      this.from$,
      this.to$).pipe(
        map(([from, to]) => {
          // Perform actions to get availability, rates etc. from/to
          
        })
      ).subscribe()
    );

    this.siteminderRows$ = combineLatest(
      this.from$,
      this.to$,
      this.lodgingColumns$
    ).pipe(
      debounceTime(50),
      map(([from, to, lodgingColumns]) => {
        // this.channelManagerStore.getAvailability(this.packagePath, start, end)
        // Get the rest of the data from the store... 

        return this.getDateRows(from, to).map(date => {
          return new SiteminderRow({
            date: date,
            lodgings: lodgingColumns.map(lodgingColumn => {
              return new LodgingCell({
                lodgingId: lodgingColumn.id,
                rateplans: lodgingColumn.rateplans.map(rateplanColumn => {
                  return new RateplanCell({
                    rateplanId: rateplanColumn.id,
                    channels: rateplanColumn.channels.map(channelColumn => {
                      return new ChannelCell({ channelId: channelColumn.id });
                    })
                  })
                })
              })
            })
          })
        });
      }),
      tap(() => console.log('rows generated')));
  }

  public toggleAll(hideAll: boolean) {
    this.actions.updateAllUi(this.packagePath, hideAll);
  }
  public toggleAvailability(hideAvailability: boolean) {
    this.actions.updateAvailabilityUi(this.packagePath, hideAvailability);
  }
  public toggleRates(hideRates: boolean) {
    this.actions.updateRatesUi(this.packagePath, hideRates);
  }
  public toggleRestrictions(hideRestrictions: boolean) {
    this.actions.updateRestrictionsUi(this.packagePath, hideRestrictions);
  }

  public whenScrolling() {
    if (this.entityList && this.entityList.measureScrollOffset('bottom') < 150) {
    }
  }

  public trackByRow(index: any, row: SiteminderRow) {
    return row ? row.date : undefined;
  }

  private getDateRows(start: Date, end: Date): Date[] {
    const newStart = new Date(start);
    const arr: Date[] = []
    const date = newStart;
    for (; newStart <= end; date.setDate(date.getDate() + 1)) {
      arr.push(new Date(date));
    }
    return arr;
  };
}
