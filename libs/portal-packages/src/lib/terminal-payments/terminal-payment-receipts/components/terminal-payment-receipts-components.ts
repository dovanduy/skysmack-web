import { Routes } from '@angular/router';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-fields';
import { TERMINAL_PAYMENT_RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { TerminalPaymentReceiptsIndexComponent } from './terminal-payment-receipts-index/terminal-payment-receipts-index.component';
import { TerminalPaymentReceiptsCreateComponent } from './terminal-payment-receipts-create/terminal-payment-receipts-create.component';
import { TerminalPaymentReceiptsEditComponent } from './terminal-payment-receipts-edit/terminal-payment-receipts-edit.component';

export const terminalPaymentReceiptsRoutes: Routes = [
  {
    path: '', component: TerminalPaymentReceiptsIndexComponent,
    children: [
      { path: 'create', component: TerminalPaymentReceiptsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TerminalPaymentReceiptsEditComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
    ], data: {
      areaKey: TERMINAL_PAYMENT_RECEIPTS_AREA_KEY
    }
  }
];

export const terminalPaymentReceiptsComponents: any[] = [
  TerminalPaymentReceiptsIndexComponent,
  TerminalPaymentReceiptsCreateComponent,
  TerminalPaymentReceiptsEditComponent
];

export const terminalPaymentReceiptsEntryComponents: any[] = [
]
