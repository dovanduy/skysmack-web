
import { Routes } from '@angular/router';
import { FieldsIndexComponent } from './fields-index/fields-index.component';
import { FieldsCreateComponent } from './fields-create/fields-create.component';

export const fieldsRoutes: Routes = [
  {
    path: '', component: FieldsIndexComponent,
    children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const fieldsComponents: any[] = [
  FieldsIndexComponent,
  FieldsCreateComponent
];
