import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { commercialAccountRoutes } from './components/commercial-account-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...commercialAccountRoutes
  ])],
  exports: [RouterModule]
})
export class CommercialAccountRoutingModule { }
