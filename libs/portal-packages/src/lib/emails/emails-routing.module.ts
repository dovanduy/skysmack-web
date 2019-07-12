import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { emailsRoutes } from './emails/components';
import { emailTemplatesRoutes } from './email-templates';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...emailsRoutes,
        ...emailTemplatesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class EmailsRoutingModule { }
