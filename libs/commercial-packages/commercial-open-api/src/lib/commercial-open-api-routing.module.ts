import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommercialSwaggerUiComponent } from './commercial-swagger-ui/commercial-swagger-ui.component';
import { CommercialUiPartnersWrapperComponent } from '@skysmack/commercial-ui-partners';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: CommercialUiPartnersWrapperComponent, children: [
        { path: '', component: CommercialSwaggerUiComponent }
      ]
    }

  ])],
  exports: [RouterModule]
})
export class CommercialOpenApiRoutingModule { }
