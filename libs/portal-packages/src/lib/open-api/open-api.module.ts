import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule } from '@skysmack/portal-ui';

import { SwaggerUiComponent } from './swagger-ui/swagger-ui.component';
import { OpenApiRoutingModule } from './open-api-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    OpenApiRoutingModule
  ],
  exports: [],
  declarations: [
    SwaggerUiComponent
  ],
  providers: []
})
export class OpenApiModule {
  constructor() { }
}
