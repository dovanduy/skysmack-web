import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgReservationsPricingsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule, FieldProviders } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { ReservationsPricingsIndexComponent } from './components/reservations-pricings-index/reservations-pricings-index.component';
import { ReservationsPricingsRoutingModule } from './reservations-pricings-routing.module';
import { ReservationsPricingsType } from '@skysmack/packages-reservations-pricings';
import { NgReservationsPricingsFieldProvider } from './ng-reservations-pricings-field-provider';
import { lodgingAllocatedPricesComponents } from './lodging-allocated-prices/components/lodging-allocated-prices-components';
import { lodgingTypeAllocatedPricesComponents } from './lodging-type-allocated-prices/components/lodging-type-allocated-prices-components';
import { lodgingPricesComponents } from './lodging-prices/components/lodging-prices-components';
import { lodgingTypePricesComponents } from './lodging-type-prices/components/lodging-type-prices-components';

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
    ...lodgingAllocatedPricesComponents,
    ...lodgingPricesComponents,
    ...lodgingTypeAllocatedPricesComponents,
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
    fieldProviders.add(ReservationsPricingsType.id, reservationsPricingsFieldProvider);
  }
}
