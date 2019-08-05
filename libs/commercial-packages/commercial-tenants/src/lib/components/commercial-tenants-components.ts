import { Routes } from '@angular/router';
import { CommercialTenantsIndexComponent } from './commercial-tenants-index/commercial-tenants-index.component';
import { CommercialTenantsCreateComponent } from './commercial-tenants-create/commercial-tenants-create.component';
import { CommercialTenantsEditComponent } from './commercial-tenants-edit/commercial-tenants-edit.component';

export const commercialTenantsRoutes: Routes = [
  {
    path: '', component: CommercialTenantsIndexComponent,
  },
  {
    path: 'create', component: CommercialTenantsCreateComponent
  },
  {
    path: 'edit/:id', component: CommercialTenantsEditComponent

  }
];

export const commercialTenantsComponents: any[] = [
  CommercialTenantsIndexComponent,
  CommercialTenantsCreateComponent,
  CommercialTenantsEditComponent
];
