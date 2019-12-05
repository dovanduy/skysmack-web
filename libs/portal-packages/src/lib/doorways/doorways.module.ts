import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoorwaysRoutingModule } from './doorways-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgDoorwaysModule } from '@skysmack/ng-doorways';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { doorwaysComponents, doorwaysEntryComponents } from './doorways/components/doorways-components';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver, NgDashboardProviders } from '@skysmack/ng-framework';
import { NgDoorwaysDashboardProvider } from './ng-doorways-dashboard-provider';
import { NgDoorwaysMenuProvider } from './ng-doorways-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgDoorwaysModule,
    DynamicFormsModule,
    DoorwaysRoutingModule,
    PortalFieldsModule,
  ],
  exports: [],
  declarations: [
    ...doorwaysComponents
  ],
  entryComponents: [
    ...doorwaysEntryComponents
  ],
  providers: []
})
export class DoorwaysModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    dashboardProviders: NgDashboardProviders,
    doorwaysDashboardProvider: NgDoorwaysDashboardProvider,
    ngMenuProviders: NgMenuProviders,
    ngDoorwaysMenuProvider: NgDoorwaysMenuProvider
  ) {
    coalescingResolver.registerResolver(localResolver);
    dashboardProviders.add(doorwaysDashboardProvider);
    ngMenuProviders
      .add(ngDoorwaysMenuProvider);
  }
}
