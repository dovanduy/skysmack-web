import { Routes } from '@angular/router';
import { CommercialDashboardComponent } from './commercial-dashboard/commercial-dashboard.component';
import { CommercialLoginComponent } from './commercial-login/commercial-login.component';

export const commercialAccountRoutes: Routes = [
  {
    path: '', component: CommercialDashboardComponent
  },
  {
    path: 'login', component: CommercialDashboardComponent
  }
];

export const commercialAccountComponents: any[] = [
  CommercialDashboardComponent,
  CommercialLoginComponent
];
