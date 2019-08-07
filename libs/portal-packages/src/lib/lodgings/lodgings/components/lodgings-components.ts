import { Routes } from '@angular/router';
import { LodgingsIndexComponent } from './lodgings-index/lodgings-index.component';
import { LodgingsCreateComponent } from './lodgings-create/lodgings-create.component';
import { LodgingsEditComponent } from './lodgings-edit/lodgings-edit.component';
import { RouteData } from '@skysmack/framework';
import { LodgingsAvailabilityComponent } from './lodgings-availability/lodgings-availability.component';
import { LODGINGS_AREA_KEY } from '@skysmack/packages-lodgings';
import { FieldsIndexComponent, FieldsCreateComponent } from '@skysmack/portal-fields';


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
  { path: 'availability', component: LodgingsAvailabilityComponent }
];

export const lodgingsComponents: any[] = [
  LodgingsIndexComponent,
  LodgingsCreateComponent,
  LodgingsEditComponent,
  LodgingsAvailabilityComponent
];
