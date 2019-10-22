import { Component, OnInit, Input } from '@angular/core';
import { RateSummary } from '../../../models/rate-summary';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SiteMinderRateSummaryDialogComponent } from '../siteminder-rate-summary-dialog/siteminder-rate-summary-dialog.component';

@Component({
  selector: 'ss-siteminder-rate-summary',
  templateUrl: './siteminder-rate-summary.component.html',
  styleUrls: ['./siteminder-rate-summary.component.scss']
})
export class SiteMinderRateSummaryComponent implements OnInit {

  @Input() public data: RateSummary;
  public summary: string;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.data) {
      const { min, max } = this.findMinMax(this.data.rates.map(x => x.rate));
      this.summary = `${min} - ${max}`;
    }
  }

  private findMinMax(arr: number[]): { min: number, max: number } {
    let min = arr[0], max = arr[0];

    for (let i = 1, len = arr.length; i < len; i++) {
      let v = arr[i];
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    }

    return { min, max };
  }

  public openDialog(): void {
    this.dialog.open(SiteMinderRateSummaryDialogComponent, {
      data: this.data
    } as MatDialogConfig)
  }
}
