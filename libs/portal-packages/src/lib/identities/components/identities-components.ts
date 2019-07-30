import { Routes } from '@angular/router';
import { IdentitiesIndexComponent } from './identities-index/identities-index.component';
import { RouteData } from '@skysmack/framework';
import { SettingsComponent } from '@skysmack/portal-settings';
import { ChangePasswordComponent } from '../accounts/components/change-password/change-password.component';
import { ConfirmEmailComponent } from '../accounts/components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from '../accounts/components/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '../accounts/components/recover-password/recover-password.component';

export const identitiesRoutes: Routes = [
  {
    path: '', component: IdentitiesIndexComponent,
    children: [
      {
        path: 'settings/lockout', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgLockoutSettingsFieldsConfig'
        } as RouteData
      },
      {
        path: 'settings/user', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgUserSettingsFieldsConfig'
        } as RouteData
      },
      {
        path: 'settings/password', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgPasswordSettingsFieldsConfig'
        } as RouteData
      },
      {
        path: 'settings/sign-in', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgSignInSettingsFieldsConfig'
        } as RouteData
      },
      {
        path: 'change-password', component: ChangePasswordComponent
      },
      {
        path: 'confirm-email', component: ConfirmEmailComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'recover-password',
        component: RecoverPasswordComponent
      }
    ]
  }
];

export const identitiesComponents: any[] = [
  IdentitiesIndexComponent
];
