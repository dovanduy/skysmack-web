import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, NgMenuProviders } from '@skysmack/portal-ui';
import { PortalUiModule } from '@skysmack/portal-ui';
import { NgEmailsSmtpModule } from '../../../../ng-packages/ng-email-smtp/src/lib';
import { EmailsSmtpRoutingModule } from './emails-smtp-routing.module';
import { NgEmailsSmptSettingsFieldsConfig } from './ng-emails-smtp-settings-fields-config';
import { emailsSmtpComponents } from './emails-smtp/components/emails-smtp-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { SettingsModule } from '@skysmack/portal-settings';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgEmailsSmtpMenuProvider } from './emails-smtp/ng-emails-smtp-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    EmailsSmtpRoutingModule,
    NgEmailsSmtpModule,
    PortalFieldsModule,
    SettingsModule
  ],
  declarations: [
    ...emailsSmtpComponents
  ],
  providers: [
    LanguageService,
    { provide: 'NgEmailsSmptSettingsFieldsConfig', useClass: NgEmailsSmptSettingsFieldsConfig },
  ]
})
export class EmailsSmtpModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngEmailsSmtpMenuProvider: NgEmailsSmtpMenuProvider,
  ) {
    ngMenuProviders
      .add(ngEmailsSmtpMenuProvider)
  }
}
