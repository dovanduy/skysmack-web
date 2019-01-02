
import { Routes } from '@angular/router';
import { DynamicFieldsIndexComponent } from './dynamic-fields-index/dynamic-fields-index.component';
import { DynamicFieldsCreateComponent } from './dynamic-fields-create/dynamic-fields-create.component';

export const dynamicFieldsRoutes: Routes = [
  {
    path: '', component: DynamicFieldsIndexComponent,
    children: [
      { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const dynamicFieldsComponents: any[] = [
  DynamicFieldsIndexComponent,
  DynamicFieldsCreateComponent
];