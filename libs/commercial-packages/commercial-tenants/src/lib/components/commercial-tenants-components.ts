import { Routes } from '@angular/router';
import { CommercialTenantsIndexComponent } from './commercial-tenants-index/commercial-tenants-index.component';
import { CommercialTenantsCreateComponent } from './commercial-tenants-create/commercial-tenants-create.component';
import { CommercialTenantsEditComponent } from './commercial-tenants-edit/commercial-tenants-edit.component';
import { CommercialTenantsDetailsComponent } from './commercial-tenants-details/commercial-tenants-details.component';
import { CommercialTenantsUsersComponent } from './commercial-tenants-users/commercial-tenants-users.component';

export const commercialTenantsRoutes: Routes = [
  {
    path: '', component: CommercialTenantsIndexComponent,
  },
  {
    path: 'create', component: CommercialTenantsCreateComponent
  },
  {
    path: 'edit/:id', component: CommercialTenantsEditComponent
  },
  {
    path: 'details/:id', component: CommercialTenantsDetailsComponent
  },
  {
    path: 'tenant-users/:userId', component: CommercialTenantsUsersComponent
  }
];

export const commercialTenantsComponents: any[] = [
  CommercialTenantsIndexComponent,
  CommercialTenantsCreateComponent,
  CommercialTenantsEditComponent,
  CommercialTenantsDetailsComponent,
  CommercialTenantsUsersComponent
];
