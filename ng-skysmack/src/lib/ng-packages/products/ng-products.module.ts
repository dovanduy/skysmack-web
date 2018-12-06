import { NgModule } from '@angular/core';

import { ReducerRegistry, registerLazyEpics } from '@skysmack/redux';
import { ProductsEpics, productsReducer, productTypesReducer, ProductTypesEpics } from '@skysmack/packages-products';
import { NgProductsRequests } from './redux/ng-products-requests';
import { NgProductTypesRequests } from './redux/ng-product-types-requests';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgProductsModule {
  constructor(productsRequests: NgProductsRequests, productTypesRequests: NgProductTypesRequests) {
    ReducerRegistry.Instance.register('products', productsReducer);
    registerLazyEpics(new ProductsEpics(productsRequests).epics);

    ReducerRegistry.Instance.register('productTypes', productTypesReducer);
    registerLazyEpics(new ProductTypesEpics(productTypesRequests).epics);
  }
}
