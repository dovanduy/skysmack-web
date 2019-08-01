import { Routes } from '@angular/router';
import { CommercialAccountDashboardComponent } from './commercial-account-dashboard/commercial-account-dashboard.component';
import { CommercialAccountLoginComponent } from './commercial-account-login/commercial-account-login.component';
import { CommercialAccountChangePasswordComponent } from './commercial-account-change-password/commercial-account-change-password.component';
import { CommercialAccountForgotPasswordComponent } from './commercial-account-forgot-password/commercial-account-forgot-password.component';

export const commercialAccountRoutes: Routes = [
  {
    path: 'login', component: CommercialAccountLoginComponent
  },
  {
    path: 'dashboard', component: CommercialAccountDashboardComponent
  },
  {
    path: 'change-password', component: CommercialAccountChangePasswordComponent
  },
  {
    path: 'forgot-password', component: CommercialAccountForgotPasswordComponent
  }
];

export const commercialAccountComponents: any[] = [
  CommercialAccountDashboardComponent,
  CommercialAccountLoginComponent,
  CommercialAccountChangePasswordComponent,
  CommercialAccountForgotPasswordComponent
];
