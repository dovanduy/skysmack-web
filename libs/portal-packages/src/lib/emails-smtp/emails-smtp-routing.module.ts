import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { emailsSmtpRoutes } from './emails-smtp/components/emails-smtp-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: DefaultComponent, children: [
          ...emailsSmtpRoutes
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class EmailsSmtpRoutingModule { }
