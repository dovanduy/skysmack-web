import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { commercialUiPartnersRoutes } from './components/commercial-ui-partners-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...commercialUiPartnersRoutes
  ])],
  exports: [RouterModule]
})
export class CommercialUiPartnersRoutingModule { }
