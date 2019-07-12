import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailsRoutingModule } from './emails-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgEmailsModule } from '../../../../ng-packages/ng-emails/src/lib';
import { PortalUiModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { emailsComponents } from './emails/components/emails-components';
import { emailTemplatesComponents } from './email-templates';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    EmailsRoutingModule,
    NgEmailsModule,
    PortalFieldsModule
  ],
  declarations: [
    ...emailsComponents,
    ...emailTemplatesComponents
  ],
  providers: [
    LanguageService
  ]
})
export class EmailsModule {
  constructor() { }
}
