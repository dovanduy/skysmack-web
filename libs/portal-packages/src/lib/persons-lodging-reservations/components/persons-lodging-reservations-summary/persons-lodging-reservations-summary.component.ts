import { Component, OnInit, Input } from '@angular/core';
import { Summary } from '@skysmack/framework';

@Component({
  selector: 'ss-persons-lodging-reservations-summary',
  templateUrl: './persons-lodging-reservations-summary.component.html'
})
export class PersonsLodgingReservationsSummaryComponent implements OnInit {
  @Input() packagePath: string;
  @Input() summary: Summary<number>;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
