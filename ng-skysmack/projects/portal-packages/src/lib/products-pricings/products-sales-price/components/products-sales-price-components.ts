import { Routes } from '@angular/router';
import { ProductsSalesPriceIndexComponent } from './products-sales-price-index/products-sales-price-index.component';
import { ProductsSalesPriceCreateComponent } from './products-sales-price-create/products-sales-price-create.component';
import { ProductsSalesPriceEditComponent } from './products-sales-price-edit/products-sales-price-edit.component';

export const productsSalesPriceRoutes: Routes = [
  {
    path: '', component: ProductsSalesPriceIndexComponent,
    children: [
      { path: 'create', component: ProductsSalesPriceCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductsSalesPriceEditComponent, pathMatch: 'full' }
    ]
  }
];

export const productsSalesPriceComponents: any[] = [
  ProductsSalesPriceIndexComponent,
  ProductsSalesPriceCreateComponent,
  ProductsSalesPriceEditComponent
];
