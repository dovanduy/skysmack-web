import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderStore, NgSiteMinderActions, NgSiteMinderChannelsStore, NgSiteMinderRatePlansStore, NgSiteMinderRatePlansActions, NgSiteMinderChannelsActions, NgSiteMinderChannelManagerStore, NgSiteMinderChannelManagerActions } from '@skysmack/ng-siteminder';
import { SiteMinderAppState, SITE_MINDER_AREA_KEY, SiteMinderUi } from '@skysmack/packages-siteminder';
import { BaseComponent } from '@skysmack/portal-fields';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { Observable, combineLatest, BehaviorSubject, of } from 'rxjs';
import { LodgingColumn } from '../../../models/lodging-column';
import { map, tap, debounceTime, distinctUntilChanged, switchMap, filter, take, flatMap } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { PagedQuery, getLocalDate } from '@skysmack/framework';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { RateplanColumn } from '../../../models/rateplan-column';
import { ChannelColumn } from '../../../models/channel-column';
import { SiteminderRow } from '../../../models/siteminder-rows';
import { LodgingCell } from '../../../models/lodging-cell';
import { RateplanCell } from '../../../models/rateplan-cell';
import { ChannelCell } from '../../../models/channel-cell';
import { RateSummary } from '../../../models/rate-summary';
import { RateInfo } from '../../../models/rate-info';

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
    private channelManagerStore: NgSiteMinderChannelManagerStore,
    private channelManagerActions: NgSiteMinderChannelManagerActions
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
      distinctUntilChanged()
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
          this.lodgingTypesStore.get(lodgingPackagePath).pipe(
            take(1),
            // tap(() => console.log('lodgingTypesStore'))
          ),
          this.ratePlansStore.get(this.packagePath).pipe(
            take(1),
            // tap(() => console.log('ratePlansStore'))
          ),
          this.channelsStore.get(this.packagePath).pipe(
            take(1),
            // tap(() => console.log('channelsStore'))
          )
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
          // tap(() => console.log('lodgingColumns'))
        ))
    );

    this.subscriptionHandler.register(combineLatest(
      this.from$,
      this.to$
    ).pipe(
      debounceTime(50),
      map(([from, to]) => {
        this.channelManagerActions.getAvailability(this.packagePath, from, to);
        this.channelManagerActions.getRates(this.packagePath, from, to);
      })
    ).subscribe());

    this.siteminderRows$ = combineLatest([
      this.from$,
      this.to$,
      this.lodgingColumns$
    ]).pipe(
      flatMap(([from, to, lodgingColumns]) => {
        return combineLatest([
          this.channelManagerStore.getAvailability(this.packagePath, from, to),
          this.channelManagerStore.getRates(this.packagePath, from, to)
        ]).pipe(          
          debounceTime(50),
          map(([availability, rates]) => this.getDateRows(from, to).map(date => {
            return new SiteminderRow({
              date: date,
              lodgingCells: lodgingColumns.map(lodgingColumn => {
                return new LodgingCell({
                  lodgingId: lodgingColumn.id,
                  availability: availability.find(avail => {
                    return avail.object.lodgingTypeId === lodgingColumn.id && avail.object.date as unknown as string === getLocalDate(date);
                  }),
                  rateplanCells: lodgingColumn.rateplans.map(rateplanColumn => {
                    return new RateplanCell({
                      rateplanId: rateplanColumn.id,
                      channelCells: rateplanColumn.channels.map(channelColumn => {
                        return new ChannelCell({ 
                          channelId: channelColumn.id,
                          rateInfo: rates.find(rate => rate.object.lodgingTypeId === lodgingColumn.id && rate.object.channelId === channelColumn.id && rate.object.date === date as any)
                        });
                      })
                    })
                  })
                })
              })
            })
          }))
        )}));
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
