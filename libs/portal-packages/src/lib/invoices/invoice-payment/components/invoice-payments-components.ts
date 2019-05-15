import { Routes } from '@angular/router';
import { InvoicePaymentsIndexComponent } from './invoice-payments-index/invoice-payments-index.component';
import { InvoicePaymentsCreateComponent } from './invoice-payments-create/invoice-payments-create.component';
import { InvoicePaymentsEditComponent } from './invoice-payments-edit/invoice-payments-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-ui';
import { INVOICE_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices';

export const invoicePaymentsRoutes: Routes = [
  {
    path: 'payments', component: InvoicePaymentsIndexComponent,
    children: [
      { path: 'create', component: InvoicePaymentsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: InvoicePaymentsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'payments/fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
    ], data: {
      areaKey: INVOICE_PAYMENTS_AREA_KEY
    }
  }
];

export const invoicePaymentsComponents: any[] = [
  InvoicePaymentsIndexComponent,
  InvoicePaymentsCreateComponent,
  InvoicePaymentsEditComponent
];
