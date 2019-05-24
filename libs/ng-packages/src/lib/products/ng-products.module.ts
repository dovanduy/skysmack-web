import { NgModule } from '@angular/core';

import { productsReducer, productTypesReducer, PRODUCTS_REDUCER_KEY, PRODUCT_TYPES_REDUCER_KEY,  } from '@skysmack/packages-products';
import { NgProductsEpics } from './products/redux/ng-products-epics';
import { NgProductTypesEpics } from './product-types/redux/ng-product-types-epics';
import { registerRedux } from '@skysmack/ng-framework';

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
    registerRedux(PRODUCTS_REDUCER_KEY, productsReducer, productsEpics);
    registerRedux(PRODUCT_TYPES_REDUCER_KEY, productTypesReducer, productTypesEpics);
  }
}
