import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { productsReducer, productTypesReducer } from '@skysmack/packages-products';
import { NgProductsEpics } from './redux/ng-products-epics';
import { NgProductTypesEpics } from './redux/ng-product-types-epics';
import { registerEpics } from '@skysmack/ng-redux';

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
    ReducerRegistry.Instance.register('products', productsReducer);
    ReducerRegistry.Instance.register('productTypes', productTypesReducer);
    registerEpics(productsEpics);
    registerEpics(productTypesEpics);
  }
}
