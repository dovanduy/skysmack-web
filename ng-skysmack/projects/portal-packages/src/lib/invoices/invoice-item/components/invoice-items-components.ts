import { Routes } from '@angular/router';
import { InvoiceItemsIndexComponent } from './invoice-items-index/invoice-items-index.component';
import { InvoiceItemsCreateComponent } from './invoice-items-create/invoice-items-create.component';
import { InvoiceItemsEditComponent } from './invoice-items-edit/invoice-items-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-ui';

export const invoiceItemsRoutes: Routes = [
  {
    path: 'items', component: InvoiceItemsIndexComponent,
    children: [
      { path: 'create', component: InvoiceItemsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: InvoiceItemsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'items/fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
    ]
  }
];

export const invoiceItemsComponents: any[] = [
  InvoiceItemsIndexComponent,
  InvoiceItemsCreateComponent,
  InvoiceItemsEditComponent
];
