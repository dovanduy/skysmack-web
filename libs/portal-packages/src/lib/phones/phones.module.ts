import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { NgPhonesModule } from '@skysmack/ng-phones';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { PhonesRoutingModule } from './phones-routing.module';
import { SettingsModule } from '@skysmack/portal-settings';
import { NgPhonesMenuProvider } from './ng-phones-menu-provider';
import { phonesComponents } from './phones/components/phones-components';
import { phoneLogsComponents } from './phones-logs/components/phone-logs-components';
import { phoneNumbersComponents } from './phones-numbers/components/phone-numbers-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgPhonesModule,
    DynamicFormsModule,
    PhonesRoutingModule,
    PortalFieldsModule,
    SettingsModule
  ],
  exports: [],
  declarations: [
    ...phonesComponents,
    ...phoneLogsComponents,
    ...phoneNumbersComponents
  ],
  entryComponents: [],
  providers: [
  ]
})
export class PhonesModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngPhonesMenuProvider: NgPhonesMenuProvider,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
  ) {
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngPhonesMenuProvider);
  }
}
