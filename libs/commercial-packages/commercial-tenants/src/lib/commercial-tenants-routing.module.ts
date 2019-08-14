import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { commercialTenantsRoutes } from './components/commercial-tenants-components';
import { CommercialUiPartnersWrapperComponent } from '@skysmack/commercial-ui-partners';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: CommercialUiPartnersWrapperComponent, children: [
        ...commercialTenantsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class CommercialTenantsRoutingModule { }
