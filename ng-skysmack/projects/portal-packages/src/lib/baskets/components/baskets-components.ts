import { Routes } from '@angular/router';
import { BasketsIndexComponent } from './baskets-index/baskets-index.component';
import { BasketsCreateComponent } from './baskets-create/baskets-create.component';
import { BasketsEditComponent } from './baskets-edit/baskets-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent, DynamicFieldsEditComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = {
  actionToken: 'NgBasketsActions',
  storeToken: 'NgBasketsStore'
} as DynamicFieldRouteData;

export const basketsRoutes: Routes = [
  {
    path: '', component: BasketsIndexComponent,
    children: [
      { path: 'create', component: BasketsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: BasketsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: DynamicFieldsIndexComponent, data, children: [
      { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data },
      { path: 'edit/:id', component: DynamicFieldsEditComponent, pathMatch: 'full', data }
    ]
  }
];

export const basketsComponents: any[] = [
  BasketsIndexComponent,
  BasketsCreateComponent,
  BasketsEditComponent
];
