import { Component, OnInit, Input } from '@angular/core';
import { Rate } from '@skysmack/packages-siteminder';

@Component({
  selector: 'ss-siteminder-rate',
  templateUrl: './siteminder-rate.component.html',
  styleUrls: ['./siteminder-rate.component.scss']
})
export class SiteMinderRateComponent implements OnInit {

  @Input() public data: Rate;
  public rate: number;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      this.rate = this.data.rate;
    }
  }
}
