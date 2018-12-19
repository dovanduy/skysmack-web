import { Routes } from '@angular/router';
import { PersonsIndexComponent } from './persons-index/persons-index.component';
import { PersonsCreateComponent } from './persons-create/persons-create.component';
import { PersonsEditComponent } from './persons-edit/persons-edit.component';
import { addDynamicFieldsRoute } from 'lib/portal-ui';

export const personsRoutes: Routes = [
  {
    path: '', component: PersonsIndexComponent,
    children: [
      { path: 'create', component: PersonsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: PersonsEditComponent, pathMatch: 'full' },
    ]
  },
  addDynamicFieldsRoute({ actionToken: 'PersonsActions', storeToken: 'PersonsStore' })
];

export const personsComponents: any[] = [
  PersonsIndexComponent,
  PersonsCreateComponent,
  PersonsEditComponent
];
