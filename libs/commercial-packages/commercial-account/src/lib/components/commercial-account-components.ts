import { Routes } from '@angular/router';
import { CommercialDashboardComponent } from './commercial-dashboard/commercial-dashboard.component';
import { CommercialLoginComponent } from './commercial-login/commercial-login.component';

export const commercialAccountRoutes: Routes = [
  {
    path: '', component: CommercialLoginComponent
  },
  {
    path: 'dashboard', component: CommercialDashboardComponent
  }
];

export const commercialAccountComponents: any[] = [
  CommercialDashboardComponent,
  CommercialLoginComponent
];
