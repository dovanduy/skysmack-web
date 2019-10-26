import { Component, OnInit, Input } from '@angular/core';
import { RateSummary } from '../../../models/rate-summary';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SiteMinderRateSummaryDialogComponent } from '../siteminder-rate-summary-dialog/siteminder-rate-summary-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ss-siteminder-rate-summary',
  templateUrl: './siteminder-rate-summary.component.html',
  styleUrls: ['./siteminder-rate-summary.component.scss']
})
export class SiteMinderRateSummaryComponent implements OnInit {

  @Input() public data: BehaviorSubject<RateSummary>;
  public summary: string;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.data.pipe(
      tap(data => {
        if (data && data.rates && data.rates.length > 0) {
          const { min, max } = this.findMinMax(data.rates.map(x => x.object.rate));
          if (min === max) {
            this.summary = min.toString();
          } else {
            this.summary = `${min} - ${max}`;
          }
        } else if (this.data) {
          this.summary = '-';
        }
      })
    ).subscribe();
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
