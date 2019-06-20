import { Routes } from '@angular/router';
import { TerminalPaymentsIndexComponent } from './terminal-payments-index/terminal-payments-index.component';

export const terminalPaymentsIndexRoutes: Routes = [
  {
    path: '', component: TerminalPaymentsIndexComponent,
  }
];

export const terminalPaymentsIndexComponents: any[] = [
  TerminalPaymentsIndexComponent,
];
