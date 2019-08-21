import { Routes } from '@angular/router';
import { InvoicePaymentsIndexComponent } from './invoice-payments-index/invoice-payments-index.component';
import { InvoicePaymentsCreateComponent } from './invoice-payments-create/invoice-payments-create.component';
import { InvoicePaymentsEditComponent } from './invoice-payments-edit/invoice-payments-edit.component';
import { INVOICE_PAYMENTS_AREA_KEY, INVOICE_PAYMENTS_ADDITIONAL_PATHS } from '@skysmack/packages-invoices';
import { getFieldsRoutes } from '@skysmack/portal-fields';

export const invoicePaymentsRoutes: Routes = [
  {
    path: 'payments', children: [
      {
        path: '', component: InvoicePaymentsIndexComponent, children: [
          { path: 'create', component: InvoicePaymentsCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: InvoicePaymentsEditComponent, pathMatch: 'full' }
        ]
      },
      getFieldsRoutes(INVOICE_PAYMENTS_AREA_KEY, INVOICE_PAYMENTS_ADDITIONAL_PATHS)
    ]
  },
];

export const invoicePaymentsComponents: any[] = [
  InvoicePaymentsIndexComponent,
  InvoicePaymentsCreateComponent,
  InvoicePaymentsEditComponent
];
