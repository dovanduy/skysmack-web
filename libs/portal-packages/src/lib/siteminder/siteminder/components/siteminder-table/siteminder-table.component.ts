import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StrIndex, SubscriptionHandler, LocalObject } from '@skysmack/framework';
import { LodgingTypeAvailability, LodgingTypeAvailabilityKey, SiteMinderUi } from '@skysmack/packages-siteminder';
import { Router } from '@angular/router';
import { SiteMinderColumn } from '../../../models/siteminder-column';
import { SiteMinderService } from '../../../services/siteminder.service';
import { RateSummary } from '../../../models/rate-summary';
import { RateInfo } from '../../../models/rate-info';
import { NgSiteMinderStore, NgSiteMinderActions } from '@skysmack/ng-siteminder';
import { map, take, tap } from 'rxjs/operators';

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
    this.packagePath = this.router.url.split('/')[1];

    this.dateColumn$ = this.service.dateColumn$;
    this.lodgingTypeColumns$ = this.service.lodgingTypeColumns$;
    this.availabilityColumns$ = this.service.availabilityColumns$;
    this.ratePlanColumns$ = this.service.ratePlanColumns$;
    this.rateSummaryColumns$ = this.service.rateSummaryColumns$;
    this.channelsColumns$ = this.service.channelsColumns$;
    this.dateRows$ = this.service.dateRows$;
    this.availabilityCells$ = this.service.availabilityCells$;
    this.rateSummaryCells$ = this.service.rateSummaryCells$;
    this.channelsCells$ = this.service.channelsCells$;

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

  public calculateLodgingTypeColspan(ltcId: number): number {
    const ratePlanColumns = this.ratePlanColumns$.getValue();
    const channelsColumns = this.channelsColumns$.getValue();
    if (channelsColumns) {
      const result = Object.keys(ratePlanColumns).map(key => {
        return channelsColumns[key] ? (channelsColumns[key].length * 2) + 2 : 0;
      }).reduce((a, b) => a + b, 0);
      // Add one extra for available column
      return result !== 0 ? result + 1 : 1;
    } else {
      return 1;
    }
  }


  public calculateRatePlanColspan(ratePlanColumnId: number): number {
    const channelsColumns = this.channelsColumns$.getValue();
    if (channelsColumns) {
      const result = channelsColumns[ratePlanColumnId] ? (channelsColumns[ratePlanColumnId].length * 2) + 2 : 0;
      // Add one extra for rate summary column
      return result !== 0 ? result : 1;
    } else {
      return 1;
    }
  }

  private addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
