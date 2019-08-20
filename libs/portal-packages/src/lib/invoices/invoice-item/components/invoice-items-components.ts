import { Routes } from '@angular/router';
import { InvoiceItemsIndexComponent } from './invoice-items-index/invoice-items-index.component';
import { InvoiceItemsCreateComponent } from './invoice-items-create/invoice-items-create.component';
import { InvoiceItemsEditComponent } from './invoice-items-edit/invoice-items-edit.component';
import { INVOICE_ITEMS_AREA_KEY, INVOICE_ITEMS_ADDITIONAL_PATHS } from '@skysmack/packages-invoices';
import { getFieldsRoutes } from '@skysmack/portal-fields';

export const invoiceItemsRoutes: Routes = [
  getFieldsRoutes(INVOICE_ITEMS_AREA_KEY, INVOICE_ITEMS_ADDITIONAL_PATHS, ['items']),
  {
    path: 'items/:invoiceId', component: InvoiceItemsIndexComponent,
    children: [
      { path: 'create', component: InvoiceItemsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: InvoiceItemsEditComponent, pathMatch: 'full' }
    ]
  }
];

export const invoiceItemsComponents: any[] = [
  InvoiceItemsIndexComponent,
  InvoiceItemsCreateComponent,
  InvoiceItemsEditComponent
];
