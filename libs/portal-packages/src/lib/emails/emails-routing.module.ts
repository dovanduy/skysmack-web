import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { emailsRoutes } from './emails/components';
import { emailTemplatesRoutes } from './email-templates';

@NgModule({
  imports: [RouterModule.forChild([
    ...emailsRoutes,
    ...emailTemplatesRoutes
  ])],
  exports: [RouterModule]
})
export class EmailsRoutingModule { }
