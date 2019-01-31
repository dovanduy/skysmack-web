import { Routes } from '@angular/router';
import { InvoicesIndexComponent } from './invoices-index/invoices-index.component';
import { InvoicesCreateComponent } from './invoices-create/invoices-create.component';
import { InvoicesEditComponent } from './invoices-edit/invoices-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent, DynamicFieldsEditComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = {
  actionToken: 'NgInvoicesActions',
  storeToken: 'NgInvoicesStore'
} as DynamicFieldRouteData;

export const invoicesRoutes: Routes = [
  {
    path: '', component: InvoicesIndexComponent,
    children: [
      { path: 'create', component: InvoicesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: InvoicesEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: DynamicFieldsIndexComponent, data, children: [
      { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data },
      { path: 'edit/:id', component: DynamicFieldsEditComponent, pathMatch: 'full', data }
    ]
  }
];

export const invoicesComponents: any[] = [
  InvoicesIndexComponent,
  InvoicesCreateComponent,
  InvoicesEditComponent
];
