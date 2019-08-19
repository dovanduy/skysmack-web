import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { CommercialOpenApiRoutingModule } from './commercial-open-api-routing.module';
import { CommercialUiPartnersModule, NgMenuProviders } from '@skysmack/commercial-ui-partners';
import { CommercialSwaggerUiComponent } from './commercial-swagger-ui/commercial-swagger-ui.component';
import { NgCommercialOpenApiMenuProvider } from './ng-commercial-open-api-menu-provider';
import { NgTranslationModule } from '@skysmack/ng-translation';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgTranslationModule,
    CommercialUiPartnersModule,
    CommercialOpenApiRoutingModule
  ],
  exports: [],
  declarations: [
    CommercialSwaggerUiComponent
  ],
  providers: []
})
export class CommercialOpenApiModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngCommercialOpenApiMenuProvider: NgCommercialOpenApiMenuProvider
  ) {
    ngMenuProviders.add(ngCommercialOpenApiMenuProvider);
  }
}
