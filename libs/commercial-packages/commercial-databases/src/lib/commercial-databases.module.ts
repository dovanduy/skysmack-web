import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialDatabasesRoutingModule } from './commercial-databases-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialDatabasesComponents } from './components/commercial-databases-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { NgTranslationModule } from '@skysmack/ng-translation';
import { CommercialUiPartnersModule, NgMenuProviders } from '@skysmack/commercial-ui-partners';
import { NgCommercialDatabasesMenuProvider } from './ng-commercial-databases-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDynamicFormsModule,
    DynamicFormsModule,
    PortalFieldsModule,
    NgTranslationModule,
    CommercialUiPartnersModule,
    CommercialDatabasesRoutingModule
  ],
  declarations: [
    ...commercialDatabasesComponents
  ],
  providers: []
})
export class CommercialDatabasesModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngCommercialUsersMenuProvider: NgCommercialDatabasesMenuProvider
  ) {
    ngMenuProviders.add(ngCommercialUsersMenuProvider);
  }
}
