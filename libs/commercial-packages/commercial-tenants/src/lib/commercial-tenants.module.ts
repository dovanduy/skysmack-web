import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialTenantsRoutingModule } from './commercial-tenants-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialTenantsComponents } from './components/commercial-tenants-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { MaterialModule } from '@skysmack/portal-ui';
import { NgTranslationModule } from '@skysmack/ng-translation';
import { CommercialUiPartnersModule, NgMenuProviders } from '@skysmack/commercial-ui-partners';
import { NgCommercialTenantsMenuProvider } from './ng-commercial-tenants-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDynamicFormsModule,
    DynamicFormsModule,
    PortalFieldsModule,
    MaterialModule,
    NgTranslationModule,
    CommercialUiPartnersModule,
    CommercialTenantsRoutingModule
  ],
  declarations: [
    ...commercialTenantsComponents
  ],
  providers: []
})
export class CommercialTenantsModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngCommercialUsersMenuProvider: NgCommercialTenantsMenuProvider
  ) {
    ngMenuProviders.add(ngCommercialUsersMenuProvider);
  }
}