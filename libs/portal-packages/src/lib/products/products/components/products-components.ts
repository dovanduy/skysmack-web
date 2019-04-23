import { Routes } from '@angular/router';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-ui';

export const productsRoutes: Routes = [
  {
    path: '', component: ProductsIndexComponent,
    children: [
      { path: 'create', component: ProductsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
    ]
  }
];

export const productsComponents: any[] = [
  ProductsIndexComponent,
  ProductsCreateComponent,
  ProductsEditComponent
];