import { Routes } from '@angular/router';
import { RolesIndexComponent } from './roles-index/roles-index.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent, DynamicFieldsEditComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = {
  actionToken: 'NgRolesActions',
  storeToken: 'NgRolesStore'
} as DynamicFieldRouteData;

export const identitiesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'roles',
  },
  {
    path: 'roles', component: RolesIndexComponent,
    children: [
      { path: 'create', component: RolesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: RolesEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: DynamicFieldsIndexComponent, data, children: [
      { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data },
      { path: 'edit/:id', component: DynamicFieldsEditComponent, pathMatch: 'full', data }
    ]
  }
];

export const identitiesComponents: any[] = [
  RolesIndexComponent,
  RolesCreateComponent,
  RolesEditComponent
];
