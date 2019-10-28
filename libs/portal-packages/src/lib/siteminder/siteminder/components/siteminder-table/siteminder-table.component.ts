import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { StrIndex, SubscriptionHandler, LocalObject } from '@skysmack/framework';
import { LodgingTypeAvailability, LodgingTypeAvailabilityKey, SiteMinderUi } from '@skysmack/packages-siteminder';
import { Router } from '@angular/router';
import { SiteMinderColumn } from '../../../models/siteminder-column';
import { SiteMinderService } from '../../../services/siteminder.service';
import { RateSummary } from '../../../models/rate-summary';
import { RateInfo } from '../../../models/rate-info';
import { NgSiteMinderStore, NgSiteMinderActions } from '@skysmack/ng-siteminder';
import { map, take, tap } from 'rxjs/operators';
import { convertObservableToBehaviorSubject } from '@skysmack/ng-framework';

@Component({
  selector: 'ss-siteminder-table',
  templateUrl: './siteminder-table.component.html',
  styleUrls: ['./siteminder-table.component.scss']
})
export class SiteMinderTableComponent implements OnInit, OnDestroy {
  // General
  private packagePath: string;
  private subscriptionHandler = new SubscriptionHandler();
  private start = new Date();
  private end = new Date();

  // Colspan
  public lodgingTypeColspan$: Observable<number>;

  // Filters
  public hideRates$: Observable<boolean>;
  public hideAvailability$: Observable<boolean>;
  public hideAll$: Observable<boolean>;
  public hideRestrictions$: Observable<boolean>;
  public hideChannels$: Observable<number[]>;
  public hideRatePlans$: Observable<number[]>;
  public hideLodgingTypes$: Observable<number[]>;

  // Columns
  public dateColumn$: BehaviorSubject<SiteMinderColumn>;
  public lodgingTypeColumns$: BehaviorSubject<SiteMinderColumn[]>;
  public availabilityColumns$: BehaviorSubject<StrIndex<SiteMinderColumn>>;
  public ratePlanColumns$: BehaviorSubject<StrIndex<SiteMinderColumn[]>>;
  public rateSummaryColumns$: BehaviorSubject<StrIndex<SiteMinderColumn>>;
  public channelsColumns$: BehaviorSubject<StrIndex<SiteMinderColumn[]>>;

  // Rows
  public dateRows$: BehaviorSubject<Date[]>;

  // Cells
  public availabilityCells$: BehaviorSubject<StrIndex<StrIndex<BehaviorSubject<LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>>>>>;
  public rateSummaryCells$: BehaviorSubject<StrIndex<StrIndex<StrIndex<BehaviorSubject<RateSummary>>>>>;
  public channelsCells$: BehaviorSubject<StrIndex<StrIndex<StrIndex<StrIndex<BehaviorSubject<RateInfo>>>>>>;

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
    this.hideRates$ = this.store.getRatesUi(this.packagePath);
    this.hideAvailability$ = this.store.getAvailabilityUi(this.packagePath);
    this.hideAll$ = this.store.getAllUi(this.packagePath);
    this.hideRestrictions$ = this.store.getRestrictionsUi(this.packagePath);
    this.hideChannels$ = this.store.getChannelsUi(this.packagePath);
    this.hideRatePlans$ = this.store.getRatePlansUi(this.packagePath);
    this.hideLodgingTypes$ = this.store.getLodgingTypesUi(this.packagePath);

    // Columns
    this.dateColumn$ = this.service.dateColumn$;
    this.lodgingTypeColumns$ = this.service.lodgingTypeColumns$;
    this.availabilityColumns$ = this.service.availabilityColumns$;
    this.ratePlanColumns$ = this.service.ratePlanColumns$;
    this.rateSummaryColumns$ = this.service.rateSummaryColumns$;
    this.channelsColumns$ = this.service.channelsColumns$;

    // Rows
    this.dateRows$ = this.service.dateRows$;

    // Cells
    this.availabilityCells$ = this.service.availabilityCells$;
    this.rateSummaryCells$ = this.service.rateSummaryCells$;
    this.channelsCells$ = this.service.channelsCells$;

    // Generate
    this.setLodgingTypeColspan();
    this.setHideAll();
    this.subscriptionHandler.register(this.service.generateColumns(this.packagePath).subscribe());
    this.subscriptionHandler.register(this.service.generateCells(this.packagePath, this.start, this.addDays(this.end, 29)).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public testUpdate(target: string) {
    switch (target) {
      case 'rates': {
        this.store.getRatesUi(this.packagePath).pipe(
          take(1),
          map(value => {
            const newValue = !value;
            this.actions.updateRatesUi(this.packagePath, newValue)
          })
        ).subscribe();
        break;
      }
      case 'restrictions': {
        this.store.getRestrictionsUi(this.packagePath).pipe(
          take(1),
          map(value => {
            const newValue = !value;
            this.actions.updateRestrictionsUi(this.packagePath, newValue)
          })
        ).subscribe();
        break;
      }
      case 'all': {
        this.store.getAllUi(this.packagePath).pipe(
          take(1),
          map(value => {
            const newValue = !value;
            this.actions.updateAllUi(this.packagePath, newValue)
          })
        ).subscribe();
        break;
      }
      case 'availability': {
        this.store.getAvailabilityUi(this.packagePath).pipe(
          take(1),
          map(value => {
            const newValue = !value;
            this.actions.updateAvailabilityUi(this.packagePath, newValue)
          })
        ).subscribe();
        break;
      }
      default: {
        break;
      }
    }
  }

  public setLodgingTypeColspan(): void {
    this.lodgingTypeColspan$ = combineLatest([
      this.ratePlanColumns$,
      this.channelsColumns$,
      this.hideRestrictions$,
      this.hideRates$,
      this.hideAvailability$
    ]).pipe(
      map(([ratePlanColumns, channelsColumns, hideRestrictions, hideRates, hideAvailability]) => {
        const rateColumns = !hideRates ? 1 : 0;
        const restrictionsColumns = !hideRestrictions ? 1 : 0;
        const availabilityColumn = !hideAvailability ? 1 : 0;

        const channelMultiplier = rateColumns + restrictionsColumns;
        const rateSummaryColumn = 1;
        const restrictionSummaryColumn = 1;
        const summaries = rateSummaryColumn + restrictionSummaryColumn;

        const result = Object.keys(ratePlanColumns).map(key => {
          return channelsColumns[key] ? (channelsColumns[key].length * channelMultiplier) + summaries : 0;
        }).reduce((a, b) => a + b, 0);

        const nextValue = result !== 0 ? result + availabilityColumn : availabilityColumn;
        return nextValue;
      })
    );
  }

  public setRatePlanColspan = (ratePlanColumnId: number): Observable<number> => {
    return combineLatest([
      this.channelsColumns$,
      this.hideRestrictions$,
      this.hideRates$,
    ]).pipe(
      map(([channelsColumns, hideRestrictions, hideRates]) => {
        const restrictionsColumns = !hideRestrictions ? 1 : 0;
        const restrictionSummaryColumn = !hideRestrictions ? 1 : 0;
        const rateColumns = !hideRates ? 1 : 0;
        const rateSummaryColumn = !hideRates ? 1 : 0;

        const channelMultiplier = rateColumns + restrictionsColumns;
        const summaries = rateSummaryColumn + restrictionSummaryColumn;

        const result = channelsColumns[ratePlanColumnId] ? (channelsColumns[ratePlanColumnId].length * channelMultiplier) + summaries : 0;
        const nextValue = result !== 0 ? result : summaries;
        return nextValue;
      })
    );
  }

  public setHideAll(): void {

  }

  private addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
