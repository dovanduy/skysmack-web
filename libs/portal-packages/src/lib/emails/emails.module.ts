import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailsRoutingModule } from './emails-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgEmailsModule } from '../../../../ng-packages/ng-emails/src/lib';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';

import { emailsComponents } from './emails/components/emails-components';
import { emailTemplatesComponents, emailTemplatesEntryComponents } from './email-templates';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgEmailsIndexMenuProvider } from './emails/ng-emails-menu-provider';
import { WYSIWYGModule } from '../wysiwyg/wysiwyg.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    EmailsRoutingModule,
    NgEmailsModule,
    PortalFieldsModule,
    WYSIWYGModule
  ],
  declarations: [
    ...emailsComponents,
    ...emailTemplatesComponents
  ],
  entryComponents: [
    ...emailTemplatesEntryComponents
  ],
  providers: []
})
export class EmailsModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngEmailsIndexMenuProvider: NgEmailsIndexMenuProvider,
  ) {
    ngMenuProviders
      .add(ngEmailsIndexMenuProvider)
  }
}
