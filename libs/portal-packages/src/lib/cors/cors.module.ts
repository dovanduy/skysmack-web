import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorsRoutingModule } from './cors-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgCorsModule } from '@skysmack/ng-cors';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { corsComponents, corsEntryComponents } from './cors/components/cors-components';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgCorsIndexMenuProvider } from './ng-cors-index-menu-provider';
import { NgCorsSettingsFieldsConfig } from './cors/ng-cors-settings-fields-config';
import { SettingsModule } from '@skysmack/portal-settings';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CorsRoutingModule,
    NgCorsModule,
    PortalUiModule,
    SettingsModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...corsComponents
  ],
  entryComponents: [
    ...corsEntryComponents
  ],
  providers: [
    { provide: 'NgCorsSettingsFieldsConfig', useClass: NgCorsSettingsFieldsConfig },
  ]
})
export class CorsModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngCorsIndexMenuProvider: NgCorsIndexMenuProvider
  ) {

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngCorsIndexMenuProvider);
  }
}
