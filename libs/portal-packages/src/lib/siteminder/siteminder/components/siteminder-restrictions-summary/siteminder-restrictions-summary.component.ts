import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SiteMinderRestrictionsSummaryDialogComponent } from '../siteminder-restrictions-summary-dialog/siteminder-restrictions-summary-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ss-siteminder-restrictions-summary',
  templateUrl: './siteminder-restrictions-summary.component.html',
  styleUrls: ['./siteminder-restrictions-summary.component.scss']
})
export class SiteMinderRestrictionsSummaryComponent implements OnInit {

  @Input() public data: BehaviorSubject<any>;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.data.pipe(
    //   tap(data => {
    //     if (data && data.rates && data.rates.length > 0) {
    //       const { min, max } = this.findMinMax(data.rates.map(x => x.object.rate));
    //       if (min === max) {
    //         this.summary = min.toString();
    //       } else {
    //         this.summary = `${min} - ${max}`;
    //       }
    //     } else if (this.data) {
    //       this.summary = '-';
    //     }
    //   })
    // ).subscribe();
  }

  public openDialog(): void {
    this.dialog.open(SiteMinderRestrictionsSummaryDialogComponent, {
      data: this.data
    } as MatDialogConfig)
  }
}
