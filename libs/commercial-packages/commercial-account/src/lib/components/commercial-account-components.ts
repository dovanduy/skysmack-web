import { Routes } from '@angular/router';
import { CommercialDashboardComponent } from './commercial-dashboard/commercial-dashboard.component';
import { CommercialLoginComponent } from './commercial-login/commercial-login.component';
import { CommercialChangePasswordComponent } from './commercial-change-password/commercial-change-password.component';
import { CommercialForgotPasswordComponent } from './commercial-forgot-password/commercial-forgot-password.component';

export const commercialAccountRoutes: Routes = [
  {
    path: 'login', component: CommercialLoginComponent
  },
  {
    path: 'dashboard', component: CommercialDashboardComponent
  },
  {
    path: 'change-password', component: CommercialChangePasswordComponent
  },
  {
    path: 'forgot-password', component: CommercialForgotPasswordComponent
  }
];

export const commercialAccountComponents: any[] = [
  CommercialDashboardComponent,
  CommercialLoginComponent,
  CommercialChangePasswordComponent,
  CommercialForgotPasswordComponent
];
