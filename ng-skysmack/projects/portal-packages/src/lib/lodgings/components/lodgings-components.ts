import { Routes } from '@angular/router';
import { LodgingsIndexComponent } from './lodgings-index/lodgings-index.component';
import { LodgingsCreateComponent } from './lodgings-create/lodgings-create.component';
import { LodgingsEditComponent } from './lodgings-edit/lodgings-edit.component';
import { DynamicFieldRouteData } from '@skysmack/framework';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent } from '@skysmack/portal-ui';

const data = new DynamicFieldRouteData({
  actionToken: 'NgLodgingsActions',
  storeToken: 'NgLodgingsStore'
});

export const lodgingsRoutes: Routes = [
  {
    path: '', component: LodgingsIndexComponent,
    children: [
      { path: 'create', component: LodgingsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: DynamicFieldsIndexComponent, data, children: [
      { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data }
    ]
  }
];

export const lodgingsComponents: any[] = [
  LodgingsIndexComponent,
  LodgingsCreateComponent,
  LodgingsEditComponent,
];
