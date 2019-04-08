import { NgModule } from '@angular/core';

import { productsReducer, productTypesReducer, PRODUCTS_AREA_KEY, PRODUCT_TYPES_AREA_KEY } from '@skysmack/packages-products';
import { NgProductsEpics } from './redux/ng-products-epics';
import { NgProductTypesEpics } from './redux/ng-product-types-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgProductsModule {
  constructor(
    productsEpics: NgProductsEpics,
    productTypesEpics: NgProductTypesEpics
  ) {
    registerRedux(PRODUCTS_AREA_KEY, productsReducer, productsEpics);
    registerRedux(PRODUCT_TYPES_AREA_KEY, productTypesReducer, productTypesEpics);
  }
}
