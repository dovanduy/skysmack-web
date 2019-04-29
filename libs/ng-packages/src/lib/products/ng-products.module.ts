import { NgModule } from '@angular/core';

import { productsReducer, productTypesReducer } from '@skysmack/packages-products';
import { NgProductsEpics } from './products/redux/ng-products-epics';
import { NgProductTypesEpics } from './product-types/redux/ng-product-types-epics';
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
    registerRedux('products', productsReducer, productsEpics);
    registerRedux('productTypes', productTypesReducer, productTypesEpics);
  }
}
