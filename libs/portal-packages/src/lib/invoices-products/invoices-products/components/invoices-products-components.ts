import { Routes } from '@angular/router';
import { InvoicesProductsAddComponent } from './invoices-products-add/invoices-products-add.component';
import { InvoicesProductsIndexComponent } from './invoices-products-index/invoices-products-index.component';

export const invoicesProductsRoutes: Routes = [
  {
    path: '', component: InvoicesProductsIndexComponent,
    children: [
      { path: 'add-to-invoice/:productId', component: InvoicesProductsAddComponent, pathMatch: 'full' },
    ]
  }
];

export const invoicesProductsComponents: any[] = [
  InvoicesProductsAddComponent,
  InvoicesProductsIndexComponent
];
