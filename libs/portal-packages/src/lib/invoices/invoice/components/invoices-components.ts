import { Routes } from '@angular/router';
import { InvoicesIndexComponent } from './invoices-index/invoices-index.component';
import { InvoicesCreateComponent } from './invoices-create/invoices-create.component';
import { InvoicesEditComponent } from './invoices-edit/invoices-edit.component';
import { InvoicesDetailsComponent } from './invoices-details/invoices-details.component';
import { INVOICES_AREA_KEY, INVOICES_ADDITIONAL_PATHS } from '@skysmack/packages-invoices';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { InvoicesSummaryComponent } from './invoices-summary/invoices-summary.component';

export const invoicesRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: InvoicesIndexComponent, children: [
          { path: 'create', component: InvoicesCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: InvoicesEditComponent, pathMatch: 'full' }
        ]
      },
      getFieldsRoutes(INVOICES_AREA_KEY, INVOICES_ADDITIONAL_PATHS)
    ]
  },
];

export const invoicesComponents: any[] = [
  InvoicesIndexComponent,
  InvoicesCreateComponent,
  InvoicesEditComponent,
  InvoicesDetailsComponent,
  InvoicesSummaryComponent
];

export const invoicesEntryComponents: any[] = [
  InvoicesDetailsComponent,
  InvoicesSummaryComponent
];
