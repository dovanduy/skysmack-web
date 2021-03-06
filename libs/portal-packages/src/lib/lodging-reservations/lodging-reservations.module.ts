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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { groupReservationsComponents, groupReservationsEntryComponents } from './group-reservations/components/group-reservations-component';
import { SignaturePadModule } from '../signature-pad/signature-pad.module';

const material = [
  MatAutocompleteModule
];

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
    SettingsModule,
    SignaturePadModule,
    ...material
  ],
  declarations: [
    ...lodgingReservationsComponents,
    ...groupReservationsComponents
  ],
  entryComponents: [
    ...lodgingReservationsEntryComponents,
    ...groupReservationsEntryComponents
  ],
  providers: [
    { provide: 'NgLodgingReservationsSettingsFieldsConfig', useClass: NgLodgingReservationsSettingsFieldsConfig }
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
