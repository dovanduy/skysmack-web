import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgPassCodesModule } from '@skysmack/ng-pass-codes';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver, NgDashboardProviders } from '@skysmack/ng-framework';
import { SettingsModule } from '@skysmack/portal-settings';

import { PassCodesRoutingModule } from './pass-codes-routing.module';
import { passCodesComponents, passCodesEntryComponents } from './pass-codes/components/pass-codes-components';

import { NgPassCodesDashboardProvider } from './ng-pass-codes-dashboard-provider';
import { NgPassCodesMenuProvider } from './ng-pass-codes-menu-provider';
import { NgPassCodeLimitSettingsFieldsConfig } from './pass-codes/ng-pass-code-limit-settings-fields-config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgPassCodesModule,
    DynamicFormsModule,
    PassCodesRoutingModule,
    PortalFieldsModule,
    SettingsModule
  ],
  exports: [],
  declarations: [
    ...passCodesComponents
  ],
  entryComponents: [
    ...passCodesEntryComponents
  ],
  providers: [
    { provide: 'NgPassCodeLimitSettingsFieldsConfig', useClass: NgPassCodeLimitSettingsFieldsConfig },
  ]
})
export class PassCodesModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    dashboardProviders: NgDashboardProviders,
    passCodesDashboardProvider: NgPassCodesDashboardProvider,
    ngMenuProviders: NgMenuProviders,
    ngPassCodesMenuProvider: NgPassCodesMenuProvider
  ) {
    coalescingResolver.registerResolver(localResolver);
    dashboardProviders.add(passCodesDashboardProvider);
    ngMenuProviders
      .add(ngPassCodesMenuProvider);
  }
}
