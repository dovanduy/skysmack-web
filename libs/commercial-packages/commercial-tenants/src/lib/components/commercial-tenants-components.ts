import { Routes } from '@angular/router';
import { CommercialTenantsIndexComponent } from './commercial-tenants-index/commercial-tenants-index.component';

export const commercialTenantsRoutes: Routes = [
  {
    path: '', component: CommercialTenantsIndexComponent
  }
];

export const commercialTenantsComponents: any[] = [
  CommercialTenantsIndexComponent
];
