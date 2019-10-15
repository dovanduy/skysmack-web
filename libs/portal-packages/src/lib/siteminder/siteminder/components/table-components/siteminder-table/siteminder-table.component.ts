import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SiteMinderService } from '../../../../siteminder.service';
import { TopColumnType } from '../../../../siteminder-mock-data';
import { Observable } from 'rxjs';

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
    private service: SiteMinderService
  ) { }

  ngOnInit() {
    this.topColumnType$ = this.service.getTopColumnType();
  }

}
