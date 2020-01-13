import { Component, OnInit, Input } from '@angular/core';
import { Summary } from '@skysmack/framework';

@Component({
  selector: 'ss-lodging-reservations-persons-summary',
  templateUrl: './lodging-reservations-persons-summary.component.html'
})
export class LodgingReservationsPersonsSummaryComponent implements OnInit {
  @Input() packagePath: string;
  @Input() summary: Summary<number>;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
