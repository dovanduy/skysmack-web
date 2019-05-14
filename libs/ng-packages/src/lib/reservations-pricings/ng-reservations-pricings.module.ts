import { NgModule } from '@angular/core';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-redux';
import { NgReservationsPricingsMenuItemProvider } from './ng-reservations-pricings-menu-item-provider';
import { lodgingAllocatedPricesReducer, lodgingTypeAllocatedPricesReducer, lodgingPricesReducer, lodgingTypePricesReducer, LODGING_ALLOCATED_PRICES_REDUCER_KEY, LODGING_TYPE_ALLOCATED_PRICES_REDUCER_KEY, LODGING_PRICES_REDUCER_KEY, LODGING_TYPE_PRICES_REDUCER_KEY } from '@skysmack/packages-reservations-pricings';
import { NgLodgingAllocatedPricesEpics } from './lodging-allocated-prices/redux/ng-lodging-allocated-prices-epics';
import { NgLodgingTypeAllocatedPricesEpics } from './lodging-type-allocated-prices/redux/ng-lodging-type-allocated-prices-epics';
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
    lodgingAllocatedPricesEpics: NgLodgingAllocatedPricesEpics,
    lodgingTypeAllocatedPricesEpics: NgLodgingTypeAllocatedPricesEpics,
    lodgingPricesEpics: NgLodgingPricesEpics,
    lodgingTypePricesEpics: NgLodgingTypePricesEpics
  ) {
    registerRedux(LODGING_ALLOCATED_PRICES_REDUCER_KEY, lodgingAllocatedPricesReducer, lodgingAllocatedPricesEpics);
    registerRedux(LODGING_TYPE_ALLOCATED_PRICES_REDUCER_KEY, lodgingTypeAllocatedPricesReducer, lodgingTypeAllocatedPricesEpics);
    registerRedux(LODGING_PRICES_REDUCER_KEY, lodgingPricesReducer, lodgingPricesEpics);
    registerRedux(LODGING_TYPE_PRICES_REDUCER_KEY, lodgingTypePricesReducer, lodgingTypePricesEpics);

    ngMenuItemProviders.add(menuItemProvider);
  }
}
