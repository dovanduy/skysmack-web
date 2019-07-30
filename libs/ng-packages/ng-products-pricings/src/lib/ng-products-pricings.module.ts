import { NgModule } from '@angular/core';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-framework';
import { NgProductsPricingsMenuItemProvider } from './ng-products-pricings-menu-item-provider';
import { productsSalesPriceReducer, productTypeSalesPriceReducer, productPriceChangesReducer, productTypePriceChangesReducer, PRODUCT_TYPE_PRICE_CHANGES_REDUCER_KEY, PRODUCT_PRICE_CHANGES_REDUCER_KEY, PRODUCT_TYPE_SALES_PRICE_REDUCER_KEY, PRODUCTS_SALES_PRICE_REDUCER_KEY } from '@skysmack/packages-products-pricings';
import { NgProductsSalesPriceEpics } from './products-sales-price/redux/ng-products-sales-price-epics';
import { NgProductTypeSalesPriceEpics } from './product-type-sales-price/redux/ng-product-type-sales-price-epics';
import { NgProductPriceChangesEpics } from './product-price-changes/redux/ng-product-price-changes-epics';
import { NgProductTypePriceChangesEpics } from './product-type-price-changes/redux/ng-product-type-price-changes-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgProductsPricingsModule {
  constructor(
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgProductsPricingsMenuItemProvider,
    productsSalesPriceEpics: NgProductsSalesPriceEpics,
    productTypeSalesPriceEpics: NgProductTypeSalesPriceEpics,
    productPriceChangesEpics: NgProductPriceChangesEpics,
    productTypePriceChangesEpics: NgProductTypePriceChangesEpics
  ) {
    registerRedux(PRODUCTS_SALES_PRICE_REDUCER_KEY, productsSalesPriceReducer, productsSalesPriceEpics);
    registerRedux(PRODUCT_TYPE_SALES_PRICE_REDUCER_KEY, productTypeSalesPriceReducer, productTypeSalesPriceEpics);

    registerRedux(PRODUCT_PRICE_CHANGES_REDUCER_KEY, productPriceChangesReducer, productPriceChangesEpics);
    registerRedux(PRODUCT_TYPE_PRICE_CHANGES_REDUCER_KEY, productTypePriceChangesReducer, productTypePriceChangesEpics);

    ngMenuItemProviders.add(menuItemProvider);
  }
}
