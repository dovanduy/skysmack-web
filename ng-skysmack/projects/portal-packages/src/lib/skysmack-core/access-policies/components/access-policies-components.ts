import { Routes } from '@angular/router';
import { AccessPoliciesDashboardComponent } from './access-policies-dashboard/access-policies-dashboard.component';

export const accessPoliciesRoutes: Routes = [
  {
    path: '', component: AccessPoliciesDashboardComponent,
  }
];

export const accessPoliciesComponents: any[] = [
  AccessPoliciesDashboardComponent,
];
