import { Routes } from '@angular/router';
import { CommercialUsersIndexComponent } from './commercial-users-index/commercial-users-index.component';
import { CommercialUsersCreateComponent } from './commercial-users-create/commercial-users-create.component';
import { CommercialUsersEditComponent } from './commercial-users-edit/commercial-users-edit.component';
import { CommercialUsersDetailsComponent } from './commercial-users-details/commercial-users-details.component';

export const commercialUsersRoutes: Routes = [
  {
    path: '', component: CommercialUsersIndexComponent,
  },
  {
    path: 'create', component: CommercialUsersCreateComponent
  },
  {
    path: 'edit/:id', component: CommercialUsersEditComponent
  },
  {
    path: 'details/:id', component: CommercialUsersDetailsComponent
  }
];

export const commercialUsersComponents: any[] = [
  CommercialUsersIndexComponent,
  CommercialUsersCreateComponent,
  CommercialUsersEditComponent,
  CommercialUsersDetailsComponent
];
