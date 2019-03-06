import { Routes } from '@angular/router';
import { InvoicePaymentsIndexComponent } from './invoice-payments-index/invoice-payments-index.component';
import { InvoicePaymentsCreateComponent } from './invoice-payments-create/invoice-payments-create.component';
import { InvoicePaymentsEditComponent } from './invoice-payments-edit/invoice-payments-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-ui';
import { FieldRouteData } from '@skysmack/framework';

const data = {
  actionToken: 'NgInvoicePaymentsActions',
  storeToken: 'NgInvoicePaymentsStore'
} as FieldRouteData;

export const invoicePaymentsRoutes: Routes = [
  {
    path: 'payments', component: InvoicePaymentsIndexComponent,
    children: [
      { path: 'create', component: InvoicePaymentsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: InvoicePaymentsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'payments/fields', component: FieldsIndexComponent, data, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full', data },
      { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full', data }
    ]
  }
];

export const invoicePaymentsComponents: any[] = [
  InvoicePaymentsIndexComponent,
  InvoicePaymentsCreateComponent,
  InvoicePaymentsEditComponent
];
