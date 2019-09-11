import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { CommercialOpenApiRoutingModule } from './commercial-open-api-routing.module';
import { CommercialUiPartnersModule, NgMenuProviders } from '@skysmack/commercial-ui-partners';
import { CommercialSwaggerUiComponent } from './commercial-swagger-ui/commercial-swagger-ui.component';
import { NgCommercialOpenApiMenuProvider } from './ng-commercial-open-api-menu-provider';
import { NgTranslationModule, LanguageService, CommercialHttpLoaderFactory } from '@skysmack/ng-translation';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgTranslationModule.forRoot(CommercialHttpLoaderFactory),
    CommercialUiPartnersModule,
    CommercialOpenApiRoutingModule
  ],
  exports: [],
  declarations: [
    CommercialSwaggerUiComponent
  ],
  providers: [
    LanguageService
  ]
})
export class CommercialOpenApiModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngCommercialOpenApiMenuProvider: NgCommercialOpenApiMenuProvider
  ) {
    ngMenuProviders.add(ngCommercialOpenApiMenuProvider);
  }
}
