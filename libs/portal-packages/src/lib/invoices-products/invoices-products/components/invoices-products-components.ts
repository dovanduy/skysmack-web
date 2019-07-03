import { Routes } from '@angular/router';
import { InvoicesProductsIndexComponent } from './invoices-products-index/invoices-products-index.component';
import { InvoicesProductsAddProductsComponent } from './invoices-products-add-products/invoices-products-add-products.component';
import { InvoicesProductsAddToInvoiceComponent } from './invoices-products-add-to-invoice/invoices-products-add-to-invoice.component';

export const invoicesProductsRoutes: Routes = [
  {
    path: '', component: InvoicesProductsIndexComponent,
    children: [
      { path: 'add-to-invoice/:productId', component: InvoicesProductsAddToInvoiceComponent, pathMatch: 'full' },
    ]
  }
];

export const invoicesProductsComponents: any[] = [
  InvoicesProductsAddToInvoiceComponent,
  InvoicesProductsAddProductsComponent,
  InvoicesProductsIndexComponent
];
