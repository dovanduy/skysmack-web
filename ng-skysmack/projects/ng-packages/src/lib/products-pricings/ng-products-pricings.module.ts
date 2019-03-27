import { NgModule } from '@angular/core';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-redux';
import { NgProductsPricingsMenuItemProvider } from './ng-products-pricings-menu-item-provider';
import { productsSalesPriceReducer, PRODUCTS_SALES_PRICE_AREA_KEY } from '@skysmack/packages-products-pricings';
import { NgProductsSalesPriceEpics } from './products-sales-price/redux/ng-products-sales-price-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgProductsPricingsModule {
  constructor(
    productsSalesPriceEpics: NgProductsSalesPriceEpics,
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgProductsPricingsMenuItemProvider
  ) {
    registerRedux(PRODUCTS_SALES_PRICE_AREA_KEY, productsSalesPriceReducer, productsSalesPriceEpics);
    ngMenuItemProviders.providers.push(menuItemProvider);
  }
}
