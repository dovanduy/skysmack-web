import { NgModule } from '@angular/core';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-redux';
import { NgProductsPricingsMenuItemProvider } from './ng-products-pricings-menu-item-provider';
import { productsSalesPriceReducer, PRODUCTS_SALES_PRICE_AREA_KEY, PRODUCT_TYPE_SALES_PRICE_AREA_KEY, productTypeSalesPriceReducer } from '@skysmack/packages-products-pricings';
import { NgProductsSalesPriceEpics } from './products-sales-price/redux/ng-products-sales-price-epics';
import { NgProductTypeSalesPriceEpics } from './product-type-sales-price/redux/ng-product-type-sales-price-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgProductsPricingsModule {
  constructor(
    productsSalesPriceEpics: NgProductsSalesPriceEpics,
    productTypeSalesPriceEpics: NgProductTypeSalesPriceEpics,
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgProductsPricingsMenuItemProvider
  ) {
    registerRedux(PRODUCTS_SALES_PRICE_AREA_KEY, productsSalesPriceReducer, productsSalesPriceEpics);
    registerRedux(PRODUCT_TYPE_SALES_PRICE_AREA_KEY, productTypeSalesPriceReducer, productTypeSalesPriceEpics);
    ngMenuItemProviders.providers.push(menuItemProvider);
  }
}
