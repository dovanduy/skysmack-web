import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StrIndex } from '@skysmack/framework';
import { SiteMinderColumn } from '../../../models/siteminder-column';
import { SiteMinderService } from '../../../services/siteminder.service';

@Component({
  selector: 'ss-siteminder-table',
  templateUrl: './siteminder-table.component.html',
  styleUrls: ['./siteminder-table.component.scss']
})
export class SiteMinderTableComponent implements OnInit {
  // Columns
  public dateColumn$: Observable<SiteMinderColumn>;
  public lodgingTypeColumns$: Observable<SiteMinderColumn[]>;
  public availabilityColumns$: Observable<StrIndex<SiteMinderColumn>>;
  public ratePlanColumns$: Observable<StrIndex<SiteMinderColumn[]>>;
  public rateSummaryColumns$: Observable<StrIndex<SiteMinderColumn>>;
  public channelsColumns$: Observable<StrIndex<SiteMinderColumn[]>>;

  // Rows
  public dateRows$: Observable<Date[]>;

  // Cells
  public availabilityCells$: Observable<StrIndex<StrIndex<string>>>;
  public rateSummaryCells$: Observable<StrIndex<StrIndex<string>>>;
  public channelsCells$: Observable<StrIndex<StrIndex<string[]>>>;

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
}
