import { Routes } from '@angular/router';
import { ApplicationsIndexComponent } from './applications-index/applications-index.component';
import { ApplicationsCreateComponent } from './applications-create/applications-create.component';
import { ApplicationsEditComponent } from './applications-edit/applications-edit.component';
import { APPLICATIONS_AREA_KEY } from '@skysmack/packages-identities';
import { ApplicationsRolesComponent } from './applications-roles/applications-roles.component';

export const applicationsRoutes: Routes = [
  {
    path: APPLICATIONS_AREA_KEY, component: ApplicationsIndexComponent,
    children: [
      { path: 'create', component: ApplicationsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ApplicationsEditComponent, pathMatch: 'full' },
      { path: 'edit/applications-roles/:id', component: ApplicationsRolesComponent, pathMatch: 'full' }
    ]
  }
];

export const applicationsComponents: any[] = [
  ApplicationsIndexComponent,
  ApplicationsCreateComponent,
  ApplicationsEditComponent,
  ApplicationsRolesComponent
];
