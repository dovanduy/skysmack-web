import { Routes } from '@angular/router';
import { PersonsIndexComponent } from './persons-index/persons-index.component';
import { PersonsCreateComponent } from './persons-create/persons-create.component';
import { PersonsEditComponent } from './persons-edit/persons-edit.component';
import { DynamicFieldRouteData } from '@skysmack/framework';

export const personsRoutes: Routes = [
  {
    path: '', component: PersonsIndexComponent,
    children: [
      { path: 'create', component: PersonsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: PersonsEditComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'fields',
    loadChildren: './lib/dynamic-fields_wrapper.module#DynamicFieldsWrapperModule',
    data: { actionToken: 'PersonsActions', storeToken: 'PersonsStore' } as DynamicFieldRouteData
  }
];

export const personsComponents: any[] = [
  PersonsIndexComponent,
  PersonsCreateComponent,
  PersonsEditComponent
];
