import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { TopColumnType } from '../../../../models/top-column-type';
import { SiteMinderService } from '../../../../services/siteminder.service';
import { SiteMinderFiltersService } from '../../../../services/siteminder-filters.service';

@Component({
  selector: 'ss-siteminder-table',
  templateUrl: './siteminder-table.component.html',
  styleUrls: ['./siteminder-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteMinderTableComponent implements OnInit {
  public topColumnType$: Observable<TopColumnType>;
  public topColumnTypes = TopColumnType;

  constructor(
    private service: SiteMinderService,
    private filters: SiteMinderFiltersService
  ) { }

  ngOnInit() {
    this.topColumnType$ = this.filters.getTopColumnType();
  }

}
