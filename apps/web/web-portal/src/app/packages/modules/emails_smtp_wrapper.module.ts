import { NgModule } from '@angular/core';
import { EmailsSmtpModule } from './../../../../../../../libs/portal-packages/src/lib/emails-smtp/emails-smtp.module';

@NgModule({
  imports: [
    EmailsSmtpModule
  ]
})
export class EmailsSmtpWrapperModule { }
