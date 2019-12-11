import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AxisPhysicalAccessControlRoutingModule } from './axis-physical-access-control-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { SettingsModule } from '@skysmack/portal-settings';
import { NgDoorwaysModule } from '@skysmack/ng-doorways';
import { NgAxisPhysicalAccessControlIndexMenuProvider } from './ng-axis-physical-access-control-index-menu-provider';
import { accessPointsComponents, accessPointsEntryComponents } from './access-points/components';
import { NgAxisPhysicalAccessControlModule } from '@skysmack/ng-axis-physical-access-control';
import { axisPhysicalAccessControlComponents, axisPhysicalAccessControlEntryComponents } from './axis-physical-access-control/components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDoorwaysModule,
    AxisPhysicalAccessControlRoutingModule,
    NgAxisPhysicalAccessControlModule,
    PortalUiModule,
    SettingsModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...accessPointsComponents,
    ...axisPhysicalAccessControlComponents
  ],
  entryComponents: [
    ...accessPointsEntryComponents,
    ...axisPhysicalAccessControlEntryComponents
  ],
  providers: []
})
export class AxisPhysicalAccessControlModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngAxisPhysicalAccessControlIndexMenuProvider: NgAxisPhysicalAccessControlIndexMenuProvider
  ) {

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngAxisPhysicalAccessControlIndexMenuProvider);
  }
}
