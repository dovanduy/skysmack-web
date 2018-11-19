
import { Routes } from '@angular/router';
import { PersonsIndexComponent } from './persons-index/persons-index.component';
import { PersonsCreateComponent } from './persons-create/persons-create.component';

export const personsRoutes: Routes = [
  {
    path: '', component: PersonsIndexComponent,
    children: [
      { path: 'create', component: PersonsCreateComponent, pathMatch: 'full' },
      // { path: 'edit/:id', component: PersonsEditComponent, pathMatch: 'full' }
    ]
  },
  // {
  //   path: 'fields', component: PersonsFieldsIndexComponent,
  //   children: [
  //     { path: 'create', component: PersonsFieldsCreateComponent, pathMatch: 'full' },
  //     { path: 'edit/:key', component: PersonsFieldsEditComponent, pathMatch: 'full' }
  //   ]
  // }
];

export const personsComponents: any[] = [
  PersonsIndexComponent,
  PersonsCreateComponent,
  // PersonsEditComponent,
  // PersonsFieldsIndexComponent,
  // PersonsFieldsCreateComponent,
  // PersonsFieldsEditComponent,
];
