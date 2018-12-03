
import { Routes } from '@angular/router';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductTypesIndexComponent } from './product-types-index/product-types-index.component';
import { ProductTypesCreateComponent } from './product-types-create/product-types-create.component';
import { ProductTypesEditComponent } from './product-types-edit/product-types-edit.component';


export const productsRoutes: Routes = [
  {
    path: '', component: ProductsIndexComponent,
    children: [
      { path: 'create', component: ProductsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductsEditComponent, pathMatch: 'full' }
    ]
  },
  // {
  //   path: 'fields', component: ProductsFieldsIndexComponent,
  //   children: [
  //     { path: 'create', component: ProductsFieldsCreateComponent, pathMatch: 'full' },
  //     { path: 'edit/:key', component: ProductsFieldsEditComponent, pathMatch: 'full' }
  //   ]
  // }
];

export const productsComponents: any[] = [
  ProductsIndexComponent,
  ProductsCreateComponent,
  ProductsEditComponent,
  ProductTypesIndexComponent,
  ProductTypesCreateComponent,
  ProductTypesEditComponent,
  // ProductsFieldsIndexComponent,
  // ProductsFieldsCreateComponent,
  // ProductsFieldsEditComponent,
];
