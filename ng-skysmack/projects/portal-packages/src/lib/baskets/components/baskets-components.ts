import { Routes } from '@angular/router';
import { BasketsIndexComponent } from './baskets-index/baskets-index.component';
import { BasketsCreateComponent } from './baskets-create/baskets-create.component';
import { BasketsEditComponent } from './baskets-edit/baskets-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-ui';
import { FieldRouteData } from '@skysmack/framework';

const data = {
  actionToken: 'NgBasketsActions',
  storeToken: 'NgBasketsStore'
} as FieldRouteData;

export const basketsRoutes: Routes = [
  {
    path: '', component: BasketsIndexComponent,
    children: [
      { path: 'create', component: BasketsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: BasketsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: FieldsIndexComponent, data, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full', data },
      { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full', data }
    ]
  }
];

export const basketsComponents: any[] = [
  BasketsIndexComponent,
  BasketsCreateComponent,
  BasketsEditComponent
];
