import { Component, OnInit, Input } from '@angular/core';
import { LodgingTypeRate } from '@skysmack/packages-siteminder';

@Component({
  selector: 'ss-siteminder-rate-summary',
  templateUrl: './siteminder-rate-summary.component.html',
  styleUrls: ['./siteminder-rate-summary.component.scss']
})
export class SiteMinderRateSummaryComponent implements OnInit {

  @Input() public data: LodgingTypeRate[];
  public summary: string;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      const { min, max } = this.findMinMax(this.data.map(x => x.rate));
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
}
