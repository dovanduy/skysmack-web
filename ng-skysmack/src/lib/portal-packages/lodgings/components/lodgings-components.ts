import { Routes } from '@angular/router';
import { LodgingsIndexComponent } from './lodgings-index/lodgings-index.component';
import { LodgingsCreateComponent } from './lodgings-create/lodgings-create.component';
import { LodgingsEditComponent } from './lodgings-edit/lodgings-edit.component';


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
];
