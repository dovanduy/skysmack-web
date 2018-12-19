import { Routes } from '@angular/router';
import { PersonsIndexComponent } from './persons-index/persons-index.component';
import { PersonsCreateComponent } from './persons-create/persons-create.component';
import { PersonsEditComponent } from './persons-edit/persons-edit.component';

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
    loadChildren: './../../portal-ui/dynamic-fields/dynamic-fields.module#DynamicFieldsModule',
    data: { reducer: 'persons' }
  }
];

export const personsComponents: any[] = [
  PersonsIndexComponent,
  PersonsCreateComponent,
  PersonsEditComponent
];
