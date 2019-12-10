import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingsDoorwaysRoutingModule } from './lodgings-doorways-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { SettingsModule } from '@skysmack/portal-settings';
import { NgDoorwaysModule } from '@skysmack/ng-doorways';
import { NgLodgingsModule } from '@skysmack/ng-lodgings';
import { NgLodgingsDoorwaysIndexMenuProvider } from './ng-lodgings-doorways-index-menu-provider';
import { lodgingsDoorwaysComponents, lodgingsDoorwaysEntryComponents } from './lodgings-doorways/components';
import { NgLodgingsDoorwaysModule } from '@skysmack/ng-lodgings-doorways';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDoorwaysModule,
    NgLodgingsModule,
    LodgingsDoorwaysRoutingModule,
    NgLodgingsDoorwaysModule,
    PortalUiModule,
    SettingsModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...lodgingsDoorwaysComponents
  ],
  entryComponents: [
    ...lodgingsDoorwaysEntryComponents
  ],
  providers: []
})
export class LodgingsDoorwaysModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngLodgingsDoorwaysIndexMenuProvider: NgLodgingsDoorwaysIndexMenuProvider
  ) {

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngLodgingsDoorwaysIndexMenuProvider);
  }
}
