import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RateInfo } from '../../../models/rate-info';
import { SiteMinderRateDialogComponent } from '../siteminder-rate-dialog/siteminder-rate-dialog.component';

@Component({
  selector: 'ss-siteminder-rate',
  templateUrl: './siteminder-rate.component.html',
  styleUrls: ['./siteminder-rate.component.scss']
})
export class SiteMinderRateComponent implements OnInit {

  @Input() public data: RateInfo;
  public rate: number;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.data) {
      const rate = this.data.rate;
      if (rate) {
        this.rate = rate.object.rate;
      }
    }
  }

  public openDialog(): void {
    this.dialog.open(SiteMinderRateDialogComponent, {
      data: this.data
    } as MatDialogConfig)
  }
}
