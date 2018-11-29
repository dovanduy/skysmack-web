import { NgModule } from '@angular/core';

import { ReducerRegistry, registerWithRootEpic } from '@skysmack/redux';
import { ProductsEpics, productsReducer, productTypesReducer, ProductTypesEpics } from '@skysmack/packages-products';
import { NgProductsRequests } from './redux/ng-products-requests';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgProductsModule {
  constructor(productsRequests: NgProductsRequests, productTypesRequests: NgProductsRequests) {
    ReducerRegistry.Instance.register('products', productsReducer);
    registerWithRootEpic(new ProductsEpics(productsRequests).epics);

    ReducerRegistry.Instance.register('productTypes', productTypesReducer);
    registerWithRootEpic(new ProductTypesEpics(productTypesRequests).epics);
  }
}
