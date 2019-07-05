import { Routes } from '@angular/router';
import { EmailsSmtpIndexComponent } from './emails-smtp-index/emails-smtp-index.component';
import { SettingsComponent } from '@skysmack/ng-settings';
import { RouteData } from '@skysmack/framework';

export const emailsSmtpRoutes: Routes = [
  {
    path: '', component: EmailsSmtpIndexComponent, children: [
      {
        path: 'settings/smtp-client', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgEmailsSmptSettingsFieldsConfig'
        } as RouteData
      }
    ]
  }
];

export const emailsSmtpComponents: any[] = [
  EmailsSmtpIndexComponent
];
