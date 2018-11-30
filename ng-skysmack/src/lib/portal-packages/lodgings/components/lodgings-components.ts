
import { Routes } from '@angular/router';
import { LodgingsIndexComponent } from './lodgings-index/lodgings-index.component';
import { LodgingsCreateComponent } from './lodgings-create/lodgings-create.component';
import { LodgingsEditComponent } from './lodgings-edit/lodgings-edit.component';
import { LodgingTypesIndexComponent } from './lodging-types-index/lodging-types-index.component';
import { LodgingTypesCreateComponent } from './lodging-types-create/lodging-types-create.component';
import { LodgingTypesEditComponent } from './lodging-types-edit/lodging-types-edit.component';


export const lodgingsRoutes: Routes = [
  {
    path: '', component: LodgingsIndexComponent,
    children: [
      { path: 'create', component: LodgingsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingsEditComponent, pathMatch: 'full' }
    ]
  },
  // {
  //   path: 'fields', component: LodgingsFieldsIndexComponent,
  //   children: [
  //     { path: 'create', component: LodgingsFieldsCreateComponent, pathMatch: 'full' },
  //     { path: 'edit/:key', component: LodgingsFieldsEditComponent, pathMatch: 'full' }
  //   ]
  // }
];

export const lodgingsComponents: any[] = [
  LodgingsIndexComponent,
  LodgingsCreateComponent,
  LodgingsEditComponent,
  LodgingTypesIndexComponent,
  LodgingTypesCreateComponent,
  LodgingTypesEditComponent,
  // LodgingsFieldsIndexComponent,
  // ProductsFieldsCreateComponent,
  // ProductsFieldsEditComponent,
];
