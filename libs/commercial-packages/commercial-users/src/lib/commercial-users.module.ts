import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialUsersRoutingModule } from './commercial-users-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialUsersComponents } from './components/commercial-users-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { MaterialModule, } from '@skysmack/portal-ui';
import { NgTranslationModule } from '@skysmack/ng-translation';
import { CommercialUiPartnersModule, NgMenuProviders } from '@skysmack/commercial-ui-partners';
import { NgCommercialUsersMenuProvider } from './ng-commercial-users-menu-provider';

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
    CommercialUsersRoutingModule
  ],
  declarations: [
    ...commercialUsersComponents
  ],
  providers: []
})
export class CommercialUsersModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngCommercialUsersMenuProvider: NgCommercialUsersMenuProvider
  ) {
    ngMenuProviders.add(ngCommercialUsersMenuProvider);
  }
}
