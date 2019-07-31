import { NgModule } from '@angular/core';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-framework';
import { NgReservationsPricingsMenuItemProvider } from './ng-reservations-pricings-menu-item-provider';
import { lodgingPricesReducer, lodgingTypePricesReducer, LODGING_PRICES_REDUCER_KEY, LODGING_TYPE_PRICES_REDUCER_KEY, LODGING_RESERVATION_PRICE_CHANGES_REDUCER_KEY, LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUCER_KEY, lodgingReservationPriceChangesReducer, lodgingTypeReservationPriceChangesReducer } from '@skysmack/packages-reservations-pricings';
import { NgLodgingPricesEpics } from './lodging-prices/redux/ng-lodging-prices-epics';
import { NgLodgingTypePricesEpics } from './lodging-type-prices/redux/ng-lodging-type-prices-epics';
import { NgLodgingReservationPriceChangesEpics } from './lodging-reservation-price-changes/redux/ng-lodging-reservation-price-changes-epics';
import { NgLodgingTypeReservationPriceChangesEpics } from './lodging-type-reservation-price-changes/redux/ng-lodging-type-reservation-price-changes-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgReservationsPricingsModule {
  constructor(
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgReservationsPricingsMenuItemProvider,
    lodgingReservationPriceChangesEpics: NgLodgingReservationPriceChangesEpics,
    lodgingTypeReservationPriceChangesEpics: NgLodgingTypeReservationPriceChangesEpics,
    lodgingPricesEpics: NgLodgingPricesEpics,
    lodgingTypePricesEpics: NgLodgingTypePricesEpics
  ) {
    registerRedux(LODGING_RESERVATION_PRICE_CHANGES_REDUCER_KEY, lodgingReservationPriceChangesReducer, lodgingReservationPriceChangesEpics);
    registerRedux(LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUCER_KEY, lodgingTypeReservationPriceChangesReducer, lodgingTypeReservationPriceChangesEpics);
    registerRedux(LODGING_PRICES_REDUCER_KEY, lodgingPricesReducer, lodgingPricesEpics);
    registerRedux(LODGING_TYPE_PRICES_REDUCER_KEY, lodgingTypePricesReducer, lodgingTypePricesEpics);

    ngMenuItemProviders.add(menuItemProvider);
  }
}
