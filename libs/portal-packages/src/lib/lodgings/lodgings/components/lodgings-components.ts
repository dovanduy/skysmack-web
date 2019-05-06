import { Routes } from '@angular/router';
import { LodgingsIndexComponent } from './lodgings-index/lodgings-index.component';
import { LodgingsCreateComponent } from './lodgings-create/lodgings-create.component';
import { LodgingsEditComponent } from './lodgings-edit/lodgings-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent } from '@skysmack/portal-ui';
import { RouteData } from '@skysmack/framework';
import { LodgingsavailabilityComponent } from './lodgings-availability/lodgings-availability.component';
import { LODGINGS_AREA_KEY } from '@skysmack/packages-lodgings';


const data = {
  fieldsConfigToken: 'NgLodgingSettingsFieldsConfig'
} as RouteData;


export const lodgingsRoutes: Routes = [
  {
    path: '', component: LodgingsIndexComponent,
    children: [
      { path: 'create', component: LodgingsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingsEditComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' }
    ], data: {
      areaKey: LODGINGS_AREA_KEY
    }
  },
  { path: 'availability', component: LodgingsavailabilityComponent }
];

export const lodgingsComponents: any[] = [
  LodgingsIndexComponent,
  LodgingsCreateComponent,
  LodgingsEditComponent,
  LodgingsavailabilityComponent
];
