import { Routes } from '@angular/router';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { DynamicFieldRouteData } from '@skysmack/framework';

export const productsRoutes: Routes = [
  {
    path: '', component: ProductsIndexComponent,
    children: [
      { path: 'create', component: ProductsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields',
    loadChildren: './../../portal-ui/dynamic-fields/dynamic-fields.module#DynamicFieldsModule',
    data: { actionToken: 'ProductsActions', storeToken: 'ProductsStore' } as DynamicFieldRouteData
  }
];

export const productsComponents: any[] = [
  ProductsIndexComponent,
  ProductsCreateComponent,
  ProductsEditComponent
];
