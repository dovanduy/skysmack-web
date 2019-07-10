import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgReservationsPricingsModule } from '@skysmack/ng-packages';
import { PortalUiModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { ReservationsPricingsIndexComponent } from './components/reservations-pricings-index/reservations-pricings-index.component';
import { ReservationsPricingsRoutingModule } from './reservations-pricings-routing.module';
import { NgReservationsPricingsFieldProvider } from './ng-reservations-pricings-field-provider';
import { lodgingReservationPriceChangesComponents } from './lodging-reservation-price-changes/components/lodging-reservation-price-changes-components';
import { lodgingTypeReservationPriceChangesComponents } from './lodging-type-reservation-price-changes/components/lodging-type-reservation-price-changes-components';
import { lodgingPricesComponents } from './lodging-prices/components/lodging-prices-components';
import { lodgingTypePricesComponents } from './lodging-type-prices/components/lodging-type-prices-components';
import { LodgingsType } from '@skysmack/packages-lodgings';
import { NgLodgingReservationsReservationsPricingsFieldProvider } from './ng-lodging-reservations-reservation-pricings-field-provider';
import { LodgingReservationsType } from '@skysmack/packages-lodging-reservations';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReservationsPricingsRoutingModule,
    NgReservationsPricingsModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ReservationsPricingsIndexComponent,
    ...lodgingReservationPriceChangesComponents,
    ...lodgingPricesComponents,
    ...lodgingTypeReservationPriceChangesComponents,
    ...lodgingTypePricesComponents,
  ],
  providers: [
    LanguageService
  ]
})
export class ReservationsPricingsModule {
  constructor(
    fieldProviders: FieldProviders,
    reservationsPricingsFieldProvider: NgReservationsPricingsFieldProvider,
    lodgingReservationsReservationsPricingsFieldProvider: NgLodgingReservationsReservationsPricingsFieldProvider,
  ) {
    fieldProviders.add(LodgingsType.id, reservationsPricingsFieldProvider);
    fieldProviders.add(LodgingReservationsType.id, lodgingReservationsReservationsPricingsFieldProvider);
  }
}
