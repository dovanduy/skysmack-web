import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';

@Component({
  selector: 'ss-terminal-payments-index',
  templateUrl: './terminal-payments-index.component.html'
})
export class TerminalPaymentsIndexComponent implements OnInit {
  public static COMPONENT_KEY = 'terminal-payments-index';
  public componentKey = TerminalPaymentsIndexComponent.COMPONENT_KEY;

  constructor(
    public componentPageTitle: EntityComponentPageTitle
  ) { }

  ngOnInit() {
    this.componentPageTitle.setTitle('TERMINAL_PAYMENTS.INDEX.TITLE');
  }

}
