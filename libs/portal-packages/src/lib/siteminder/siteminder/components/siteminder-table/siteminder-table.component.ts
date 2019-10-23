import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StrIndex, SubscriptionHandler } from '@skysmack/framework';
import { SiteMinderColumn } from '../../../models/siteminder-column';
import { SiteMinderService } from '../../../services/siteminder.service';
import { Availability } from '@skysmack/packages-siteminder';
import { RateSummary } from '../../../models/rate-summary';
import { RateInfo } from '../../../models/rate-info';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ss-siteminder-table',
  templateUrl: './siteminder-table.component.html',
  styleUrls: ['./siteminder-table.component.scss']
})
export class SiteMinderTableComponent implements OnInit {
  private packagePath: string;
  private subscriptionHandler = new SubscriptionHandler();

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
  public availabilityCells$: BehaviorSubject<StrIndex<StrIndex<Availability>>>;
  public rateSummaryCells$: BehaviorSubject<StrIndex<StrIndex<StrIndex<RateSummary>>>>;
  public channelsCells$: BehaviorSubject<StrIndex<StrIndex<StrIndex<StrIndex<RateInfo>>>>>;

  constructor(
    private router: Router,
    private service: SiteMinderService,
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

    this.service.seedColumns(this.packagePath).subscribe();
  }

  public calculateLodgingTypeColspan(ltcId: number): number {
    const availabilityColumns = this.availabilityColumns$.getValue();
    const ratePlanColumns = this.ratePlanColumns$.getValue();
    const channelsColumns = this.channelsColumns$.getValue();
    if (channelsColumns) {
      const result = Object.keys(ratePlanColumns).map(key => {
        // Add one extra for rate summary column (one pr. rateplan)
        return channelsColumns[key] ? channelsColumns[key].length + 1 : 0;
      }).reduce((a, b) => a + b, 0);
      // Add one extra for available column
      return result !== 0 ? result + 1 : 1;
    } else {
      //
      return 1;
    }
  }


  public calculateRatePlanColspan(ratePlanColumnId: number): number {
    const channelsColumns = this.channelsColumns$.getValue();
    if (channelsColumns) {
      // Rate plan colspan is equal to the count of its own channel columns
      // Add one extra for rate summary column
      const result = channelsColumns[ratePlanColumnId] ? channelsColumns[ratePlanColumnId].length + 1 : 0;
      return result !== 0 ? result : 1;
    } else {
      return 1;
    }
  }
}
