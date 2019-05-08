import { Routes } from '@angular/router';
import { InvoicesCashPaymentsIndexComponent } from './invoices-cash-payments-index/invoices-cash-payments-index.component';
import { InvoicesCashPaymentsCreateComponent } from './invoices-cash-payments-create/invoices-cash-payments-create.component';
import { InvoicesCashPaymentsEditComponent } from './invoices-cash-payments-edit/invoices-cash-payments-edit.component';

export const invoicesCashPaymentsRoutes: Routes = [
  {
    path: '', component: InvoicesCashPaymentsIndexComponent,
    children: [
      { path: 'create', component: InvoicesCashPaymentsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: InvoicesCashPaymentsEditComponent, pathMatch: 'full' },
    ]
  }
];

export const invoicesCashPaymentsComponents: any[] = [
  InvoicesCashPaymentsIndexComponent,
  InvoicesCashPaymentsCreateComponent,
  InvoicesCashPaymentsEditComponent,
];
