import { Routes } from '@angular/router';
import { InvoiceItemsIndexComponent } from './invoice-items-index/invoice-items-index.component';
import { InvoiceItemsCreateComponent } from './invoice-items-create/invoice-items-create.component';
import { InvoiceItemsEditComponent } from './invoice-items-edit/invoice-items-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent, DynamicFieldsEditComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = {
  actionToken: 'NgInvoiceItemsActions',
  storeToken: 'NgInvoiceItemsStore'
} as DynamicFieldRouteData;

export const invoiceItemsRoutes: Routes = [
  {
    path: 'items', component: InvoiceItemsIndexComponent,
    children: [
      { path: 'create', component: InvoiceItemsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: InvoiceItemsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'items/fields', component: DynamicFieldsIndexComponent, data, children: [
      { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data },
      { path: 'edit/:id', component: DynamicFieldsEditComponent, pathMatch: 'full', data }
    ]
  }
];

export const invoiceItemsComponents: any[] = [
  InvoiceItemsIndexComponent,
  InvoiceItemsCreateComponent,
  InvoiceItemsEditComponent
];
