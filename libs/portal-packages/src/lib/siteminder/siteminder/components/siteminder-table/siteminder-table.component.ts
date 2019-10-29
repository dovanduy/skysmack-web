import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { SubscriptionHandler } from '@skysmack/framework';
import { Router } from '@angular/router';
import { SiteMinderService } from '../../../services/siteminder.service';
import { NgSiteMinderStore, NgSiteMinderActions } from '@skysmack/ng-siteminder';
import { map, distinctUntilChanged, tap, share } from 'rxjs/operators';
import { UiOptions, Columns, Cells } from './table-objects';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'ss-siteminder-table',
  templateUrl: './siteminder-table.component.html',
  styleUrls: ['./siteminder-table.component.scss']
})
export class SiteMinderTableComponent implements OnInit, OnDestroy {
  // General
  public packagePath: string;
  private subscriptionHandler = new SubscriptionHandler();
  private start = new Date();
  private end = new Date();

  @ViewChild('entityList', { static: true }) public entityList: CdkVirtualScrollViewport;

  // Colspan
  public lodgingTypeColspan$: Observable<number>;
  public ratePlanColspan$: Observable<number>;
  public allColspan$: Observable<number>;
  public channelsColspan$: Observable<number>;

  // Filters
  public uiOptions$: Observable<UiOptions>;

  // Columns
  public columns$: Observable<Columns>;

  // Rows
  public dateRows$: BehaviorSubject<Date[]>;

  // Cells
  public cells$: Observable<Cells>;

  constructor(
    private router: Router,
    private service: SiteMinderService,
    public store: NgSiteMinderStore,
    public actions: NgSiteMinderActions,
  ) { }

  ngOnInit() {
    // General
    this.packagePath = this.router.url.split('/')[1];

    // Filters
    this.uiOptions$ = combineLatest(
      this.store.getRatesUi(this.packagePath),
      this.store.getAvailabilityUi(this.packagePath),
      this.store.getAllUi(this.packagePath),
      this.store.getRestrictionsUi(this.packagePath),
      this.store.getChannelsUi(this.packagePath),
      this.store.getRatePlansUi(this.packagePath),
      this.store.getLodgingTypesUi(this.packagePath)
    ).pipe(
      map(([
        hideRates,
        hideAvailability,
        hideAll,
        hideRestrictions,
        hideChannels,
        hideRatePlans,
        hideLodgingTypes]) => new UiOptions({
          hideRates,
          hideAvailability,
          hideAll,
          hideRestrictions,
          hideChannels,
          hideRatePlans,
          hideLodgingTypes
        }))
    );

    // Columns
    this.columns$ = combineLatest(
      this.service.dateColumn$,
      this.service.lodgingTypeColumns$,
      this.service.availabilityColumns$,
      this.service.ratePlanColumns$,
      this.service.rateSummaryColumns$,
      this.service.channelsColumns$
    ).pipe(
      map(([
        dateColumn,
        lodgingTypeColumns,
        availabilityColumns,
        ratePlanColumns,
        rateSummaryColumns,
        channelsColumns
      ]) => new Columns({
        dateColumn,
        lodgingTypeColumns,
        availabilityColumns,
        ratePlanColumns,
        rateSummaryColumns,
        channelsColumns
      }))
    );

    // Rows
    this.dateRows$ = this.service.dateRows$;

    // Cells
    this.cells$ = combineLatest(
      this.service.availabilityCells$,
      this.service.rateSummaryCells$,
      this.service.channelsCells$
    ).pipe(
      map(
        ([
          availabilityCells,
          rateSummaryCells,
          channelsCells
        ]) => new Cells({
          availabilityCells,
          rateSummaryCells,
          channelsCells
        })
      )
    );

    // Colspans
    this.setChannelColspan();
    this.setAllColspan();
    this.setRatePlanColspan();
    this.setLodgingTypeColspan();

    // Generate
    this.subscriptionHandler.register(this.service.generateColumns(this.packagePath).subscribe());
    this.subscriptionHandler.register(this.service.generateCells(this.packagePath, this.start, this.addDays(this.end, 29)).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public testUpdate(target: string, value: any) {
    switch (target) {
      case 'rates': {
        this.actions.updateRatesUi(this.packagePath, value);
        break;
      }
      case 'restrictions': {
        this.actions.updateRestrictionsUi(this.packagePath, value);
        break;
      }
      case 'all': {
        this.actions.updateAllUi(this.packagePath, value);
        break;
      }
      case 'availability': {
        this.actions.updateAvailabilityUi(this.packagePath, value);
        break;
      }
      default: {
        break;
      }
    }
  }

  public setChannelColspan(): void {
    this.channelsColspan$ = combineLatest(
      this.store.getRestrictionsUi(this.packagePath).pipe(distinctUntilChanged()),
      this.store.getRatesUi(this.packagePath).pipe(distinctUntilChanged())
    ).pipe(
      map(([hideRestrictions, hideRates]) => {
        const restrictionsColspan = !hideRestrictions ? 1 : 0;
        const rateColspan = !hideRates ? 1 : 0;
        return restrictionsColspan + rateColspan;
      }),
      // share()
    )
  }

  public setAllColspan(): void {
    this.allColspan$ = combineLatest(
      this.channelsColspan$.pipe(distinctUntilChanged()),
      this.store.getAllUi(this.packagePath).pipe(distinctUntilChanged())
    ).pipe(
      map(([channelsColspan, hideAll]) => hideAll ? 0 : channelsColspan),
      // share()
    )
  }

  public setRatePlanColspan(): void {
    this.ratePlanColspan$ = combineLatest([
      this.service.channelsColumns$.pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))),
      this.channelsColspan$.pipe(distinctUntilChanged()),
      this.allColspan$.pipe(distinctUntilChanged()),
    ]).pipe(
      map(([channelsColumns, channelsColspan, allColspan]) => {
        const keys = Object.keys(channelsColumns)
        const channelColumnsCount = keys[0] ? channelsColumns[keys[0]].length : 0;
        const colspan = (channelColumnsCount * channelsColspan) + allColspan;
        return colspan;
      }),
      // share()
    );
  }

  public setLodgingTypeColspan(): void {
    this.lodgingTypeColspan$ = combineLatest([
      this.store.getAvailabilityUi(this.packagePath).pipe(distinctUntilChanged()),
      this.ratePlanColspan$.pipe(distinctUntilChanged()),
      this.service.ratePlanColumns$.pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))),
    ]).pipe(
      map(([hideAvailability, ratePlanColspan, ratePlanColumns]) => {
        const availabilityColspan = !hideAvailability ? 1 : 0;
        const keys = Object.keys(ratePlanColumns)
        const ratePlanColumnsCount = keys[0] ? ratePlanColumns[keys[0]].length : 0;
        const colspan = (ratePlanColumnsCount * ratePlanColspan) + availabilityColspan;
        return colspan;
      }),
      // share()
    );
  }

  public whenScrolling() {
    if (this.entityList && this.entityList.measureScrollOffset('bottom') < 150) {
    }
  }

  public trackByDate(index, item) {
    if (!item) {
      return null;
    }
    return item.toString();
  }

  private addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
