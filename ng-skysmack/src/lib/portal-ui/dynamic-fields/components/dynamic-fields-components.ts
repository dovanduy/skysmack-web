
import { Routes, Route } from '@angular/router';
import { DynamicFieldsIndexComponent } from './dynamic-fields-index/dynamic-fields-index.component';
import { DynamicFieldsCreateComponent } from './dynamic-fields-create/dynamic-fields-create.component';
import { DynamicFieldRouteData } from '@skysmack/framework';

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

export const addDynamicFieldsRoute = (data: DynamicFieldRouteData): Route => {
  return {
    path: 'fields',
    loadChildren: './../dynamic-fields.module#DynamicFieldsModule',
    data
  };
};
