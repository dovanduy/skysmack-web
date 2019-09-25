import { Routes } from '@angular/router';
import { CommercialUsersIndexComponent } from './commercial-users-index/commercial-users-index.component';
import { CommercialUsersCreateComponent } from './commercial-users-create/commercial-users-create.component';
import { CommercialUsersEditComponent } from './commercial-users-edit/commercial-users-edit.component';
import { CommercialUsersDetailsComponent } from './commercial-users-details/commercial-users-details.component';
import { CommercialUsersRolesComponent } from './commercial-users-roles/commercial-users-roles.component';

export const commercialUsersRoutes: Routes = [
  {
    path: '', component: CommercialUsersIndexComponent
  },
  {
    path: 'create', component: CommercialUsersCreateComponent
  },
  {
    path: 'edit/:id', component: CommercialUsersEditComponent
  },
  {
    path: 'details/:id', component: CommercialUsersDetailsComponent
  },
  {
    path: 'roles/:userId', component: CommercialUsersRolesComponent
  }
];

export const commercialUsersComponents: any[] = [
  CommercialUsersIndexComponent,
  CommercialUsersCreateComponent,
  CommercialUsersEditComponent,
  CommercialUsersDetailsComponent,
  CommercialUsersRolesComponent
];
