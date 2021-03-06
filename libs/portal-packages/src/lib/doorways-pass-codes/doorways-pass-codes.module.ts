import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoorwaysPassCodesRoutingModule } from './doorways-pass-codes-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgDoorwaysPassCodesModule } from '@skysmack/ng-doorways-pass-codes';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDoorwaysPassCodesIndexMenuProvider } from './ng-doorways-pass-codes-index-menu-provider';
import { SettingsModule } from '@skysmack/portal-settings';
import { NgDoorwaysModule } from '@skysmack/ng-doorways';
import { NgPassCodesModule } from '@skysmack/ng-pass-codes';
import { doorwaysPassCodesComponents, doorwaysPassCodesEntryComponents } from './doorways-pass-codes/components/doorways-pass-codes-components';
import { doorwaysOptionsComponents, doorwaysOptionsEntryComponents } from './doorways-options/components/doorways-options-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDoorwaysModule,
    NgPassCodesModule,
    DoorwaysPassCodesRoutingModule,
    NgDoorwaysPassCodesModule,
    PortalUiModule,
    SettingsModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...doorwaysPassCodesComponents,
    ...doorwaysOptionsComponents
  ],
  entryComponents: [
    ...doorwaysPassCodesEntryComponents,
    ...doorwaysOptionsEntryComponents
  ],
  providers: []
})
export class DoorwaysPassCodesModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngDoorwaysPassCodesIndexMenuProvider: NgDoorwaysPassCodesIndexMenuProvider
  ) {

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngDoorwaysPassCodesIndexMenuProvider);
  }
}
