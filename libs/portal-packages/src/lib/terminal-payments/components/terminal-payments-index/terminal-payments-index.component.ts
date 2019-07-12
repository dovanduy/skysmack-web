import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgTerminalPaymentsIndexMenu } from '../../ng-terminal-payments-index-menu';

@Component({
  selector: 'ss-terminal-payments-index',
  templateUrl: './terminal-payments-index.component.html'
})
export class TerminalPaymentsIndexComponent implements OnInit {

  constructor(
    public sidebarMenu: NgTerminalPaymentsIndexMenu,
    public componentPageTitle: EntityComponentPageTitle
  ) { }

  ngOnInit() {
    this.componentPageTitle.setTitle('TERMINAL_PAYMENTS_INDEX.TITLE');
  }

}
