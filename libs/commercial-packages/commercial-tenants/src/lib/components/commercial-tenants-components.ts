import { Routes } from '@angular/router';
import { CommercialTenantsIndexComponent } from './commercial-tenants-index/commercial-tenants-index.component';
import { CommercialTenantsCreateComponent } from './commercial-tenants-create/commercial-tenants-create.component';
import { CommercialTenantsEditComponent } from './commercial-tenants-edit/commercial-tenants-edit.component';
import { CommercialTenantsDetailsComponent } from './commercial-tenants-details/commercial-tenants-details.component';
import { CommercialTenantsUsersComponent } from './commercial-tenants-users/commercial-tenants-users.component';
import { SubDomainFieldComponent } from './sub-domain-field/sub-domain-field.component';
import { MultipleUsersFieldComponent } from './multiple-users-field/multiple-users-field.component';
import { JSONFieldComponent } from './json-field/json-field.component';
import { CommercialTenantsPackagesComponent } from './commercial-tenants-packages/commercial-tenants-packages.component';
import { CommercialTenantsPackagesIndexComponent } from './commercial-tenants-packages-index/commercial-tenants-packages-index.component';

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
    path: 'tenant-users/:userId', component: CommercialTenantsUsersComponent,
  },
  {
    path: 'packages', component: CommercialTenantsPackagesIndexComponent
  },
  {
    path: 'packages/:category', component: CommercialTenantsPackagesIndexComponent
  },
  {
    path: 'packages/:category/:name', component: CommercialTenantsPackagesComponent
  }
];

export const commercialTenantsComponents: any[] = [
  CommercialTenantsIndexComponent,
  CommercialTenantsCreateComponent,
  CommercialTenantsEditComponent,
  CommercialTenantsDetailsComponent,
  CommercialTenantsUsersComponent,
  CommercialTenantsPackagesIndexComponent,
  CommercialTenantsPackagesComponent
];

export const commercialTenantsEntryComponents: any[] = [
  SubDomainFieldComponent,
  MultipleUsersFieldComponent,
  JSONFieldComponent
];
