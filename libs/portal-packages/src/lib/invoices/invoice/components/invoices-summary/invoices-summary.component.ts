import { Component, OnInit, Input } from '@angular/core';
import { Summary } from '@skysmack/framework';

@Component({
  selector: 'ss-invoices-summary',
  templateUrl: './invoices-summary.component.html'
})
export class InvoicesSummaryComponent implements OnInit {
  @Input() packagePath: string;
  @Input() summary: Summary<number>;

  constructor(
  ) {
  }

  ngOnInit() {
    console.log(this.summary);
  }
}
