import { Routes } from '@angular/router';
import { IdentitiesIndexComponent } from './identities-index/identities-index.component';
import { RouteData } from '@skysmack/framework';
import { SettingsComponent } from '@skysmack/portal-settings';
import { ChangePasswordComponent } from '../accounts/components/change-password/change-password.component';
import { ConfirmEmailComponent } from '../accounts/components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from '../accounts/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../accounts/components/reset-password/reset-password.component';

export const identitiesRoutes: Routes = [
  {
    path: '', component: IdentitiesIndexComponent, children: [
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
        path: 'settings/email', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgEmailSettingsFieldsConfig'
        } as RouteData
      },
      {
        path: 'settings/template-package', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgTemplatePackageSettingsFieldsConfig'
        } as RouteData
      },
      {
        path: 'change-password', component: ChangePasswordComponent
      },
    ],
  },
  {
    path: '', children: [
      {
        path: 'confirm-email', component: ConfirmEmailComponent
      },
      {
        path: 'forgot-password', component: ForgotPasswordComponent
      },
      {
        path: 'reset-password', component: ResetPasswordComponent
      }
    ]
  }
];

export const identitiesComponents: any[] = [
  IdentitiesIndexComponent
];
