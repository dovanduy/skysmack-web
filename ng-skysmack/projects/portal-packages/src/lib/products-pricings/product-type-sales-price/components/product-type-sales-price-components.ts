import { Routes } from '@angular/router';
import { ProductTypeSalesPriceIndexComponent } from './product-type-sales-price-index/product-type-sales-price-index.component';
import { ProductTypeSalesPriceCreateComponent } from './product-type-sales-price-create/product-type-sales-price-create.component';
import { ProductTypeSalesPriceEditComponent } from './product-type-sales-price-edit/product-type-sales-price-edit.component';

export const productTypeSalesPriceRoutes: Routes = [
  {
    path: 'sales-prices/types', component: ProductTypeSalesPriceIndexComponent,
    children: [
      { path: 'create', component: ProductTypeSalesPriceCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductTypeSalesPriceEditComponent, pathMatch: 'full' }
    ]
  }
];

export const productTypeSalesPriceComponents: any[] = [
  ProductTypeSalesPriceIndexComponent,
  ProductTypeSalesPriceCreateComponent,
  ProductTypeSalesPriceEditComponent
];
