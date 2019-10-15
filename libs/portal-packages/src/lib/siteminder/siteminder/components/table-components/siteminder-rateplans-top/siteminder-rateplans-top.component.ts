import { Component, OnInit } from '@angular/core';
import { SiteMinderService } from '../../../../services/siteminder.service';
import { Observable } from 'rxjs';
import { SiteMinderColumn } from '../../../../models/siteminder-column';

@Component({
  selector: 'ss-siteminder-rateplans-top',
  templateUrl: './siteminder-rateplans-top.component.html',
  styleUrls: ['./siteminder-rateplans-top.component.scss']
})
export class SiteMinderRateplansTopComponent implements OnInit {

  public columns$: Observable<SiteMinderColumn[]>;

  constructor(
    private service: SiteMinderService
  ) { }

  ngOnInit() {
    this.columns$ = this.service.getColumns();
  }

}
