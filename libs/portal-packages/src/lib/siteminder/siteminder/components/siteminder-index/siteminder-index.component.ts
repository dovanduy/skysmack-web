import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderStore, NgSiteMinderActions, NgSiteMinderChannelsStore, NgSiteMinderRatePlansStore, NgSiteMinderRatePlansActions, NgSiteMinderChannelsActions } from '@skysmack/ng-siteminder';
import { SiteMinderAppState, SITE_MINDER_AREA_KEY } from '@skysmack/packages-siteminder';
import { BaseComponent } from '@skysmack/portal-fields';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { Observable, combineLatest } from 'rxjs';
import { LodgingColumn } from '../../../models/lodging-column';
import { UiOptions } from '../siteminder-table/table-objects';
import { map, tap, share, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { PagedQuery } from '@skysmack/framework';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { RateplanColumn } from '../../../models/rateplan-column';
import { ChannelColumn } from '../../../models/channel-column';

@Component({
  selector: 'ss-siteminder-index',
  templateUrl: './siteminder-index.component.html',
  styleUrls: ['./siteminder-index.component.scss']
})
export class SiteMinderIndexComponent extends BaseComponent<SiteMinderAppState, unknown> implements OnInit {
  public static COMPONENT_KEY = 'siteminder-index';
  public componentKey = SiteMinderIndexComponent.COMPONENT_KEY;
  public areaKey: string = SITE_MINDER_AREA_KEY;

  @ViewChild('entityList', { static: true }) public entityList: CdkVirtualScrollViewport;

  public lodgingColumns$: Observable<LodgingColumn[]>;
  public uiOptions: UiOptions;

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
  ) {
    super(router, activatedRoute, skysmackStore, title);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle('Rate & Restrictions Manager');

    const lodgingPackagePath$ = getPackageDendencyAsStream(this.skysmackStore, this.packagePath, [0, 1, 0]).pipe(
      map(_package => _package.object.path),
      distinctUntilChanged()
    );

    this.uiOptions = new UiOptions({
      hideChannels: [],
      hideRatePlans: [],
      hideLodgingTypes: []
    });

    let count = 0;
    this.subscriptionHandler.register(combineLatest(
      this.store.getRatesUi(this.packagePath),
      this.store.getAvailabilityUi(this.packagePath),
      this.store.getAllUi(this.packagePath),
      this.store.getRestrictionsUi(this.packagePath),
      this.store.getChannelsUi(this.packagePath),
      this.store.getRatePlansUi(this.packagePath),
      this.store.getLodgingTypesUi(this.packagePath)
    ).pipe(
      debounceTime(10),
      map(([
        hideRates,
        hideAvailability,
        hideAll,
        hideRestrictions,
        hideChannels,
        hideRatePlans,
        hideLodgingTypes]) => {
        this.uiOptions.hideAll = hideAll;
        this.uiOptions.hideAvailability = hideAvailability;
        this.uiOptions.hideRates = hideRates;
        this.uiOptions.hideRestrictions = hideRestrictions;
        this.uiOptions.hideChannels = hideChannels;
        this.uiOptions.hideRatePlans = hideRatePlans;
        this.uiOptions.hideLodgingTypes = hideLodgingTypes;
      }),
      share(),
      tap(x => console.log('ui', ++count))
    ).subscribe());

    this.ratePlansActions.getPaged(this.packagePath, new PagedQuery());
    this.channelsActions.getPaged(this.packagePath, new PagedQuery());

    this.subscriptionHandler.register(lodgingPackagePath$.pipe(
      tap(lodgingPackagePath => this.lodgingTypesActions.getPaged(lodgingPackagePath, new PagedQuery()))
    ).subscribe());

    this.lodgingColumns$ = lodgingPackagePath$.pipe(
      switchMap(lodgingPackagePath =>
        combineLatest(
          this.lodgingTypesStore.get(lodgingPackagePath),
          this.ratePlansStore.get(this.packagePath),
          this.channelsStore.get(this.packagePath)
        ).pipe(
          debounceTime(50),
          map(([lodgings, rateplans, channels]) =>
            lodgings.map(lodging => {
                // console.log('somthing', lodgings, rateplans, channels);
                return new LodgingColumn({ id: lodging.object.id, title: lodging.object.name, rateplans: rateplans.map(rateplan => new RateplanColumn({ id: rateplan.object.id, title: rateplan.object.name, channels: channels.map(channel => new ChannelColumn({ id: channel.object.id, title: channel.object.name })) })) });
              }
            )
          ),
          tap(lodgingColumn => console.log('lodgingColumn', lodgingColumn))
        ))
    );
  }


  public toggleAll() {
    this.actions.updateAllUi(this.packagePath, !this.uiOptions.hideAll);
  }
  public toggleAvailability() {
    this.actions.updateAvailabilityUi(this.packagePath, !this.uiOptions.hideAvailability);
  }
  public toggleRates() {
    this.actions.updateRatesUi(this.packagePath, !this.uiOptions.hideRates);
  }
  public toggleRestrictions() {
    this.actions.updateRestrictionsUi(this.packagePath, !this.uiOptions.hideRestrictions);
  }

  public whenScrolling() {
    if (this.entityList && this.entityList.measureScrollOffset('bottom') < 150) {
    }
  }
}
