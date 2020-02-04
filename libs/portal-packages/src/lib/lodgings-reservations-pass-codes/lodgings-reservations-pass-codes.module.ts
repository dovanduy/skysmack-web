import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingsReservationsPassCodesRoutingModule } from './lodgings-reservations-pass-codes-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgLodgingsReservationsPassCodesModule } from '@skysmack/ng-lodgings-reservations-pass-codes';
import { PortalUiModule } from '@skysmack/portal-ui';
import { CoalescingComponentFactoryResolver, NgSummaryProviders } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { SettingsModule } from '@skysmack/portal-settings';
import { lodgingsReservationsPassCodesComponents, lodgingsReservationsPassCodesEntryComponents } from './lodgings-reservations-pass-codes/components/lodgings-reservations-pass-codes-components';
import { NgLodgingReservationsModule } from '@skysmack/ng-lodging-reservations';
import { NgPassCodesLodgingReservationsSummaryProvider } from './lodgings-reservations-pass-codes/components/pass-codes-lodging-reservations-summary/ng-pass-codes-lodging-reservations-summary-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgLodgingReservationsModule,
    LodgingsReservationsPassCodesRoutingModule,
    NgLodgingsReservationsPassCodesModule,
    PortalUiModule,
    SettingsModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...lodgingsReservationsPassCodesComponents
  ],
  entryComponents: [
    ...lodgingsReservationsPassCodesEntryComponents
  ],
  providers: []
})
export class LodgingsReservationsPassCodesModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    passCodesLodgingsReservationsSummaryProvider: NgPassCodesLodgingReservationsSummaryProvider,
    summaryProviders: NgSummaryProviders
  ) {
    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    summaryProviders
      .add(passCodesLodgingsReservationsSummaryProvider);
  }
}
