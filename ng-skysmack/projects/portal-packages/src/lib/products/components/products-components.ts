import { Routes } from '@angular/router';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent, DynamicFieldsEditComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = {
  actionToken: 'NgProductsActions',
  storeToken: 'NgProductsStore'
} as DynamicFieldRouteData;

export const productsRoutes: Routes = [
  {
    path: '', component: ProductsIndexComponent,
    children: [
      { path: 'create', component: ProductsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: DynamicFieldsIndexComponent, data, children: [
      { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data },
      { path: 'edit/:id', component: DynamicFieldsEditComponent, pathMatch: 'full', data }
    ]
  }
];

export const productsComponents: any[] = [
  ProductsIndexComponent,
  ProductsCreateComponent,
  ProductsEditComponent
];
