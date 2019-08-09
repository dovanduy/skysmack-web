import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgMenuProviders } from '@skysmack/portal-ui';

import { NgIdentitiesModule } from '@skysmack/ng-identities';
import { PortalUiModule } from '@skysmack/portal-ui';
import { LodgingReservationsRoutingModule } from './lodging-reservations-routing.module';
import { lodgingReservationsComponents, lodgingReservationsEntryComponents } from './lodging-reservations/lodgings-reservations-components';
import { NgLodgingReservationsSettingsFieldsConfig } from './ng-lodging-reservations-settings-fields-config';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { SettingsModule } from '@skysmack/portal-settings';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgLodgingReservationsModule } from '@skysmack/ng-lodging-reservations';
import { NgDashboardProviders, CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { NgLodgingReservationsDashboardProvider } from './lodging-reservations/ng-lodging-reservations-dashboard-provider';
import { NgLodgingsReservationsMenuProvider } from './ng-lodgings-reservations-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    LodgingReservationsRoutingModule,
    NgLodgingReservationsModule,
    NgIdentitiesModule,
    PortalFieldsModule,
    SettingsModule
  ],
  declarations: [
    ...lodgingReservationsComponents,
  ],
  entryComponents: [
    ...lodgingReservationsEntryComponents
  ],
  providers: [
    { provide: 'NgLodgingReservationsSettingsFieldsConfig', useClass: NgLodgingReservationsSettingsFieldsConfig },
  ]
})
export class LodgingReservationsModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    dashboardProviders: NgDashboardProviders,
    lodgingReservationsDashboardProvider: NgLodgingReservationsDashboardProvider,
    ngMenuProviders: NgMenuProviders,
    ngLodgingsReservationsMenuProvider: NgLodgingsReservationsMenuProvider
  ) {
    coalescingResolver.registerResolver(localResolver);
    dashboardProviders.add(lodgingReservationsDashboardProvider);
    ngMenuProviders
      .add(ngLodgingsReservationsMenuProvider);
  }
}
