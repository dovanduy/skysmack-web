import { NgModule } from '@angular/core';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-redux';
import { NgReservationsPricingsMenuItemProvider } from './ng-reservations-pricings-menu-item-provider';
import { lodgingReservationPriceChangesReducer, lodgingTypeReservationPriceChangesReducer, lodgingPricesReducer, lodgingTypePricesReducer } from '@skysmack/packages-reservations-pricings';
import { NgLodgingReservationPriceChangesEpics } from './lodging-reservation-price-changes/redux/ng-lodging-reservation-price-changes-epics';
import { NgLodgingTypeReservationPriceChangesEpics } from './lodging-type-reservation-price-changes/redux/ng-lodging-type-reservation-price-changes-epics';
import { NgLodgingPricesEpics } from './lodging-prices/redux/ng-lodging-prices-epics';
import { NgLodgingTypePricesEpics } from './lodging-type-prices/redux/ng-lodging-type-prices-epics';

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
    registerRedux('lodgingReservationPriceChanges', lodgingReservationPriceChangesReducer, lodgingReservationPriceChangesEpics);
    registerRedux('lodgingTypeReservationPriceChanges', lodgingTypeReservationPriceChangesReducer, lodgingTypeReservationPriceChangesEpics);
    registerRedux('lodgingPrices', lodgingPricesReducer, lodgingPricesEpics);
    registerRedux('lodgingTypePrices', lodgingTypePricesReducer, lodgingTypePricesEpics);

    ngMenuItemProviders.add(menuItemProvider);
  }
}
