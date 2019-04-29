import { NgModule } from '@angular/core';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-redux';
import { NgReservationsPricingsMenuItemProvider } from './ng-reservations-pricings-menu-item-provider';
import { lodgingAllocatedPricesReducer, lodgingTypeAllocatedPricesReducer, lodgingPricesReducer, lodgingTypePricesReducer } from '@skysmack/packages-reservations-pricings';
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
    registerRedux('lodgingAllocatedPrices', lodgingAllocatedPricesReducer, lodgingAllocatedPricesEpics);
    registerRedux('lodgingTypeAllocatedPrices', lodgingTypeAllocatedPricesReducer, lodgingTypeAllocatedPricesEpics);
    registerRedux('lodgingPrices', lodgingPricesReducer, lodgingPricesEpics);
    registerRedux('lodgingTypePrices', lodgingTypePricesReducer, lodgingTypePricesEpics);

    ngMenuItemProviders.add(menuItemProvider);
  }
}
