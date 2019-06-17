import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { NgEmailsSmtpModule } from '@skysmack/ng-packages';
import { EmailsSmtpRoutingModule } from './emails-smtp-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    EmailsSmtpRoutingModule,
    NgEmailsSmtpModule,
    FieldsModule
  ],
  declarations: [
  ],
  providers: [
    LanguageService
  ]
})
export class EmailsSmtpModule {
  constructor() { }
}
