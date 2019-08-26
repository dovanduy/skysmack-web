import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { commercialDatabasesRoutes } from './components/commercial-databases-components';
import { CommercialUiPartnersWrapperComponent } from '@skysmack/commercial-ui-partners';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: CommercialUiPartnersWrapperComponent, children: [
        ...commercialDatabasesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class CommercialDatabasesRoutingModule { }
