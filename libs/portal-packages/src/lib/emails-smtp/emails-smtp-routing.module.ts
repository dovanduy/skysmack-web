import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { emailsSmtpRoutes } from './emails-smtp/components/emails-smtp-components';

@NgModule({
  imports: [
    RouterModule.forChild([
      ...emailsSmtpRoutes
    ])
  ],
  exports: [RouterModule]
})
export class EmailsSmtpRoutingModule { }
