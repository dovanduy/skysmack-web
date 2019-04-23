import { Routes } from '@angular/router';
import { InvoicesIndexComponent } from './invoices-index/invoices-index.component';
import { InvoicesCreateComponent } from './invoices-create/invoices-create.component';
import { InvoicesEditComponent } from './invoices-edit/invoices-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-ui';

export const invoicesRoutes: Routes = [
  {
    path: '', component: InvoicesIndexComponent,
    children: [
      { path: 'create', component: InvoicesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: InvoicesEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
    ]
  }
];

export const invoicesComponents: any[] = [
  InvoicesIndexComponent,
  InvoicesCreateComponent,
  InvoicesEditComponent
];