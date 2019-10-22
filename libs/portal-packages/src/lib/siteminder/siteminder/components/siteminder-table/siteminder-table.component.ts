import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { StrIndex } from '@skysmack/framework';
import { SiteMinderColumn } from '../../../models/siteminder-column';
import { SiteMinderService } from '../../../services/siteminder.service';
import { Availability, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ss-siteminder-table',
  templateUrl: './siteminder-table.component.html',
  styleUrls: ['./siteminder-table.component.scss']
})
export class SiteMinderTableComponent implements OnInit {
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
  public rateSummaryCells$: BehaviorSubject<StrIndex<StrIndex<LodgingTypeRate[]>>>;
  public channelsCells$: BehaviorSubject<StrIndex<StrIndex<StrIndex<LodgingTypeRate>>>>;

  constructor(
    private service: SiteMinderService,
  ) { }

  ngOnInit() {
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
  }

  public calculateLodgingTypeColspan(): number {
    const ratePlanColumns = this.ratePlanColumns$.getValue();
    const channelsColumns = this.channelsColumns$.getValue();
    return Object.keys(ratePlanColumns).map(key => {
      // Lodging type colspan is equal to the count of channel columns
      // + 1 for availability + 1 for rate summary
      return channelsColumns[key].length + 2;
    }).reduce((a, b) => a + b, 0);
  }


  public calculateRatePlanColspan(ratePlanColumnId: number): number {
    const channelsColumns = this.channelsColumns$.getValue();
    // Rate plan colspan is equal to the count of its own channel columns
    // + 1 for rate summary
    return channelsColumns[ratePlanColumnId].length + 1;
  }
}
