import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailsRoutingModule } from './emails-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgEmailsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { emailsComponents } from './emails/components/emails-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    EmailsRoutingModule,
    NgEmailsModule,
    FieldsModule
  ],
  declarations: [
    ...emailsComponents
  ],
  providers: [
    LanguageService
  ]
})
export class EmailsModule {
  constructor() { }
}
