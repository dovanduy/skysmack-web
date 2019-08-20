import { Routes } from '@angular/router';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { TERMINAL_PAYMENT_RECEIPTS_AREA_KEY, TERMINAL_PAYMENT_RECEIPTS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';
import { TerminalPaymentReceiptsIndexComponent } from './terminal-payment-receipts-index/terminal-payment-receipts-index.component';
import { TerminalPaymentReceiptsCreateComponent } from './terminal-payment-receipts-create/terminal-payment-receipts-create.component';
import { TerminalPaymentReceiptsEditComponent } from './terminal-payment-receipts-edit/terminal-payment-receipts-edit.component';

export const terminalPaymentReceiptsRoutes: Routes = [
  {
    path: 'payment-receipts', component: TerminalPaymentReceiptsIndexComponent,
    children: [
      { path: 'create', component: TerminalPaymentReceiptsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TerminalPaymentReceiptsEditComponent, pathMatch: 'full' },
    ]
  },
  getFieldsRoutes(TERMINAL_PAYMENT_RECEIPTS_AREA_KEY, TERMINAL_PAYMENT_RECEIPTS_ADDITIONAL_PATHS, ['payment-receipts']),
];

export const terminalPaymentReceiptsComponents: any[] = [
  TerminalPaymentReceiptsIndexComponent,
  TerminalPaymentReceiptsCreateComponent,
  TerminalPaymentReceiptsEditComponent
];

export const terminalPaymentReceiptsEntryComponents: any[] = [
]
