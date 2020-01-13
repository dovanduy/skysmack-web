import { Component, OnInit, Input } from '@angular/core';
import { Summary } from '@skysmack/framework';

@Component({
  selector: 'ss-invoices-persons-summary',
  templateUrl: './invoices-persons-summary.component.html'
})
export class InvoicesPersonsSummaryComponent implements OnInit {
  @Input() packagePath: string;
  @Input() summary: Summary<number>;

  constructor(
  ) {
  }

  ngOnInit() {
    console.log(this.summary);
  }
}
