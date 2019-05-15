import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgReservationsPricingsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule, FieldProviders } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { ReservationsPricingsIndexComponent } from './components/reservations-pricings-index/reservations-pricings-index.component';
import { ReservationsPricingsRoutingModule } from './reservations-pricings-routing.module';
import { NgReservationsPricingsFieldProvider } from './ng-reservations-pricings-field-provider';
import { lodgingReservationPriceChangesComponents } from './lodging-reservation-price-changes/components/lodging-reservation-price-changes-components';
import { lodgingTypeReservationPriceChangesComponents } from './lodging-type-reservation-price-changes/components/lodging-type-reservation-price-changes-components';
import { lodgingPricesComponents } from './lodging-prices/components/lodging-prices-components';
import { lodgingTypePricesComponents } from './lodging-type-prices/components/lodging-type-prices-components';
import { LodgingsType } from '@skysmack/packages-lodgings';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReservationsPricingsRoutingModule,
    NgReservationsPricingsModule,
    PortalUiModule,
    FieldsModule
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
  ) {
    fieldProviders.add(LodgingsType.id, reservationsPricingsFieldProvider);
  }
}
