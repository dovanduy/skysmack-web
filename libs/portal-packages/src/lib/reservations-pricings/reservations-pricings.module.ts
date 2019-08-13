import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgReservationsPricingsModule } from '@skysmack/ng-reservations-pricings';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { ReservationsPricingsIndexComponent } from './components/reservations-pricings-index/reservations-pricings-index.component';
import { ReservationsPricingsRoutingModule } from './reservations-pricings-routing.module';
import { NgReservationsPricingsFieldProvider } from './ng-reservations-pricings-field-provider';
import { lodgingReservationPriceChangesComponents } from './lodging-reservation-price-changes/components/lodging-reservation-price-changes-components';
import { lodgingTypeReservationPriceChangesComponents } from './lodging-type-reservation-price-changes/components/lodging-type-reservation-price-changes-components';
import { lodgingPricesComponents } from './lodging-prices/components/lodging-prices-components';
import { lodgingTypePricesComponents } from './lodging-type-prices/components/lodging-type-prices-components';
import { LodgingsTypeId } from '@skysmack/package-types';
import { NgLodgingReservationsReservationsPricingsFieldProvider } from './ng-lodging-reservations-reservation-pricings-field-provider';
import { LodgingReservationsTypeId } from '@skysmack/package-types';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';
import { NgReservationsPricingsMenuProvider } from './ng-reservations-pricings-menu-provider';

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
    ngMenuProviders: NgMenuProviders, 
    ngReservationsPricingsMenuProvider: NgReservationsPricingsMenuProvider,
  ) {
    fieldProviders.add(LodgingsTypeId, reservationsPricingsFieldProvider);
    fieldProviders.add(LodgingReservationsTypeId, lodgingReservationsReservationsPricingsFieldProvider);
    ngMenuProviders
    .add(ngReservationsPricingsMenuProvider)
  }
}
