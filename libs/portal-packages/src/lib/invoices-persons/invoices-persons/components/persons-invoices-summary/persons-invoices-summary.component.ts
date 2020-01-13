import { Component, OnInit, Input } from '@angular/core';
import { Summary } from '@skysmack/framework';

@Component({
  selector: 'ss-persons-invoices-summary',
  templateUrl: './persons-invoices-summary.component.html'
})
export class PersonsInvoicesSummaryComponent implements OnInit {
  @Input() packagePath: string;
  @Input() summary: Summary<number>;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
