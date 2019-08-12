import { Routes } from '@angular/router';
import { CommercialAccountDashboardComponent } from './commercial-account-dashboard/commercial-account-dashboard.component';
import { CommercialAccountLoginComponent } from './commercial-account-login/commercial-account-login.component';
import { CommercialAccountChangePasswordComponent } from './commercial-account-change-password/commercial-account-change-password.component';
import { CommercialAccountForgotPasswordComponent } from './commercial-account-forgot-password/commercial-account-forgot-password.component';
import { CommercialAccountLoginWrapperComponent } from './commercial-account-login-wrapper/commercial-account-login-wrapper.component';
import { CommercialUiPartnersWrapperComponent } from '@skysmack/commercial-ui-partners';

export const commercialAccountRoutes: Routes = [
  {
    path: '', component: CommercialUiPartnersWrapperComponent, children: [
      {
        path: 'dashboard', component: CommercialAccountDashboardComponent
      },
      {
        path: 'change-password', component: CommercialAccountChangePasswordComponent
      }
    ]
  },
  {
    path: '', component: CommercialAccountLoginWrapperComponent,
    data: { removeCloseButton: true }, children: [
      {
        path: 'login', component: CommercialAccountLoginComponent
      },
      {
        path: 'forgot-password', component: CommercialAccountForgotPasswordComponent
      }
    ]
  }
];

export const commercialAccountComponents: any[] = [
  CommercialAccountLoginWrapperComponent,
  CommercialAccountDashboardComponent,
  CommercialAccountLoginComponent,
  CommercialAccountChangePasswordComponent,
  CommercialAccountForgotPasswordComponent
];
