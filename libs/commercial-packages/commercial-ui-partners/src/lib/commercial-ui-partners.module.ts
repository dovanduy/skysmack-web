import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialUiPartnersRoutingModule } from './commercial-ui-partners-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialUiPartnersComponents } from './components/commercial-ui-partners-components';
import { MaterialModule } from '@skysmack/portal-ui';
import { NgTranslationModule } from '@skysmack/ng-translation';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,

    NgTranslationModule,
    CommercialUiPartnersRoutingModule
  ],
  declarations: [
    ...commercialUiPartnersComponents
  ],
  providers: []
})
export class CommercialUiPartnersModule {
  constructor() { }
}
