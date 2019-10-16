import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteMinderService } from '../../../../services/siteminder.service';
import { SiteMinderColumn } from '../../../../models/siteminder-column';
import { StrIndex } from '@skysmack/framework';
import { LodgingTypeAvailability, Rate } from '@skysmack/packages-siteminder';

@Component({
  selector: 'ss-siteminder-rateplans-top',
  templateUrl: './siteminder-rateplans-top.component.html',
  styleUrls: ['./siteminder-rateplans-top.component.scss']
})
export class SiteMinderRateplansTopComponent implements OnInit {
  public dateColumn$: Observable<SiteMinderColumn<Date[]>>;
  public logingTypeColumns$: Observable<SiteMinderColumn<null>[]>;
  public lodgingTypeAvailability$: Observable<StrIndex<SiteMinderColumn<LodgingTypeAvailability[]>>>;
  public lodgingTypeRatePlans$: Observable<StrIndex<SiteMinderColumn<null>[]>>;
  public ratePlanRateSummary$: Observable<StrIndex<SiteMinderColumn<string[]>>>; // Better to pass channels
  public ratePlanChannels$: Observable<StrIndex<SiteMinderColumn<Rate[]>[]>>;

  constructor(
    private service: SiteMinderService
  ) { }

  ngOnInit() {
    this.dateColumn$ = this.service.dateColumn$;
    this.logingTypeColumns$ = this.service.logingTypeColumns$;
    this.lodgingTypeAvailability$ = this.service.lodgingTypeAvailability$;
    this.lodgingTypeRatePlans$ = this.service.lodgingTypeRatePlans$;
    this.ratePlanRateSummary$ = this.service.ratePlanRateSummary$;
    this.ratePlanChannels$ = this.service.ratePlanChannels$;
  }

}
