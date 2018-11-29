import { NgModule } from '@angular/core';

import { ReducerRegistry, registerWithRootEpic } from '@skysmack/redux';
import { ProductsEpics, productsReducer } from '@skysmack/packages-products';
import { NgProductsRequests } from './redux/ng-products-requests';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgProductsModule {
  constructor(productsRequests: NgProductsRequests) {
    ReducerRegistry.Instance.register('products', productsReducer);
    registerWithRootEpic(new ProductsEpics(productsRequests).epics);
  }
}
