import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule } from '@skysmack/portal-ui';

import { SwaggerUiComponent } from './swagger-ui/swagger-ui.component';
import { OpenApiRoutingModule } from './open-api-routing.module';
import { NgOpenApiDocumentSettingsFieldsConfig } from './ng-open-api-document-settings-fields-config';
import { SettingsModule } from '@skysmack/portal-settings';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    OpenApiRoutingModule,
    SettingsModule
  ],
  exports: [],
  declarations: [
    SwaggerUiComponent
  ],
  providers: [
    { provide: 'NgOpenApiDocumentSettingsFieldsConfig', useClass: NgOpenApiDocumentSettingsFieldsConfig }
  ]
})
export class OpenApiModule {
  constructor() { }
}
