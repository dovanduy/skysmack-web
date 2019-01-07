import { Routes } from '@angular/router';
import { PersonsIndexComponent } from './persons-index/persons-index.component';
import { PersonsCreateComponent } from './persons-create/persons-create.component';
import { PersonsEditComponent } from './persons-edit/persons-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = new DynamicFieldRouteData({
  actionToken: 'NgPersonsActions',
  storeToken: 'NgPersonsStore'
});

export const personsRoutes: Routes = [
  {
    path: '', component: PersonsIndexComponent,
    children: [
      { path: 'create', component: PersonsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: PersonsEditComponent, pathMatch: 'full' },
    ]
  },
  { path: 'fields', component: DynamicFieldsIndexComponent, data },
  { path: 'fields/create', component: DynamicFieldsCreateComponent, data }
];

export const personsComponents: any[] = [
  PersonsIndexComponent,
  PersonsCreateComponent,
  PersonsEditComponent
];
