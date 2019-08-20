import { Routes } from '@angular/router';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { PRODUCTS_AREA_KEY, PRODUCTS_ADDITIONAL_PATHS } from '@skysmack/packages-products';
import { getFieldsRoutes } from '@skysmack/portal-fields';

export const productsRoutes: Routes = [
  {
    path: '', component: ProductsIndexComponent,
    children: [
      { path: 'create', component: ProductsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductsEditComponent, pathMatch: 'full' }
    ]
  },
  getFieldsRoutes(PRODUCTS_AREA_KEY, PRODUCTS_ADDITIONAL_PATHS)
];

export const productsComponents: any[] = [
  ProductsIndexComponent,
  ProductsCreateComponent,
  ProductsEditComponent
];
