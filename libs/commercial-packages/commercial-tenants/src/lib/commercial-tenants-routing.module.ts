import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { commercialTenantsRoutes } from './components/commercial-tenants-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...commercialTenantsRoutes
  ])],
  exports: [RouterModule]
})
export class CommercialTenantsRoutingModule { }
