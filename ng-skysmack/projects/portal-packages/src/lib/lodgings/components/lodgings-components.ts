import { Routes } from '@angular/router';
import { LodgingsIndexComponent } from './lodgings-index/lodgings-index.component';
import { LodgingsCreateComponent } from './lodgings-create/lodgings-create.component';
import { LodgingsEditComponent } from './lodgings-edit/lodgings-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent, SettingsComponent } from '@skysmack/portal-ui';
import { RouteData } from '@skysmack/framework';

const data = {
  fieldsConfigToken: 'NgLodgingSettingsFieldsConfig'
} as RouteData;


export const lodgingsRoutes: Routes = [
  {
    path: '', component: LodgingsIndexComponent,
    children: [
      { path: 'create', component: LodgingsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingsEditComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full', data }
    ]
  },
  {
    path: 'fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingsComponents: any[] = [
  LodgingsIndexComponent,
  LodgingsCreateComponent,
  LodgingsEditComponent,
];
