import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialAccountRoutingModule } from './commercial-account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialAccountComponents } from './components/commercial-account-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { NgTranslationModule } from '@skysmack/ng-translation';
import { CommercialUiPartnersModule } from '@skysmack/commercial-ui-partners';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDynamicFormsModule,
    DynamicFormsModule,
    PortalFieldsModule,
    CommercialUiPartnersModule,
    NgTranslationModule,
    CommercialAccountRoutingModule
  ],
  declarations: [
    ...commercialAccountComponents
  ],
  providers: []
})
export class CommercialAccountModule {
  constructor() { }
}
