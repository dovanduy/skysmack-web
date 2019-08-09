import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { commercialUsersRoutes } from './components/commercial-users-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...commercialUsersRoutes
  ])],
  exports: [RouterModule]
})
export class CommercialUsersRoutingModule { }
