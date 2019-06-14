import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { emailsRoutes } from './emails/components';

@NgModule({
  imports: [RouterModule.forChild([
    ...emailsRoutes
  ])],
  exports: [RouterModule]
})
export class EmailsRoutingModule { }
