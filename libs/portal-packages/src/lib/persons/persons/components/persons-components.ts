import { Routes } from '@angular/router';
import { PersonsIndexComponent } from './persons-index/persons-index.component';
import { PersonsCreateComponent } from './persons-create/persons-create.component';
import { PersonsEditComponent } from './persons-edit/persons-edit.component';
import { PersonsDetailsComponent } from './persons-details/persons-details.component';
import { PERSONS_AREA_KEY, PERSONS_ADDITIONAL_PATHS } from '@skysmack/packages-persons';
import { PersonsDashboardComponent } from './persons-dashboard/persons-dashboard.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';

export const personsRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: PersonsIndexComponent, children: [
          { path: 'create', component: PersonsCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: PersonsEditComponent, pathMatch: 'full' },
          { path: 'details/:id', component: PersonsDetailsComponent, pathMatch: 'full' },
        ]
      },
      getFieldsRoutes(PERSONS_AREA_KEY, PERSONS_ADDITIONAL_PATHS)
    ]
  }
];

export const personsComponents: any[] = [
  PersonsIndexComponent,
  PersonsCreateComponent,
  PersonsEditComponent,
  PersonsDetailsComponent,
  PersonsDashboardComponent
];

export const personsEntryComponents: any[] = [
  PersonsDashboardComponent
]
