import { NgModule } from '@angular/core';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-redux';
import { NgProductsPricingsMenuItemProvider } from './ng-products-pricings-menu-item-provider';
import { productsSalesPriceReducer, productTypeSalesPriceReducer, productPriceChangesReducer, productTypePriceChangesReducer } from '@skysmack/packages-products-pricings';
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
    registerRedux('productsSalesPrice', productsSalesPriceReducer, productsSalesPriceEpics);
    registerRedux('productTypeSalesPrice', productTypeSalesPriceReducer, productTypeSalesPriceEpics);

    registerRedux('productPriceChanges', productPriceChangesReducer, productPriceChangesEpics);
    registerRedux('productTypePriceChanges', productTypePriceChangesReducer, productTypePriceChangesEpics);

    ngMenuItemProviders.add(menuItemProvider);
  }
}
