import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, SettingsModule } from '@skysmack/portal-ui';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { NgEmailsSmtpModule } from '@skysmack/ng-packages';
import { EmailsSmtpRoutingModule } from './emails-smtp-routing.module';
import { NgEmailsSmptSettingsFieldsConfig } from './ng-emails-smtp-settings-fields-config';
import { emailsSmtpComponents } from './emails-smtp/components/emails-smtp-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    EmailsSmtpRoutingModule,
    NgEmailsSmtpModule,
    FieldsModule,
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
  constructor() { }
}
