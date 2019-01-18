import { Routes } from '@angular/router';
import { TerminalsIndexComponent } from './terminals-index/terminals-index.component';
import { TerminalsCreateComponent } from './terminals-create/terminals-create.component';
import { TerminalsEditComponent } from './terminals-edit/terminals-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = {
  actionToken: 'NgTerminalsActions',
  storeToken: 'NgTerminalsStore'
} as DynamicFieldRouteData;

export const terminalsRoutes: Routes = [
  {
    path: '', component: TerminalsIndexComponent,
    children: [
      { path: 'create', component: TerminalsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TerminalsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: DynamicFieldsIndexComponent, data, children: [
      { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data }
    ]
  }
];

export const terminalsComponents: any[] = [
  TerminalsIndexComponent,
  TerminalsCreateComponent,
  TerminalsEditComponent
];
