import { NgModule } from '@angular/core';

import { ReducerRegistry } from '@skysmack/redux';
import { productsReducer, productTypesReducer } from '@skysmack/packages-products';
import { NgProductsActions } from './redux/ng-products-actions';
import { NgProductsStore } from './redux/ng-products-store';
import { NgProductsEpics } from './redux/ng-products-epics';
import { NgProductTypesEpics } from './redux/ng-product-types-epics';
import { registerEpics } from '@skysmack/ng-redux';
import { NgProductTypesActions } from './redux/ng-product-types-actions';
import { NgProductTypesStore } from './redux/ng-product-types-store';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgProductsActions', useClass: NgProductsActions },
      { provide: 'NgProductsStore', useClass: NgProductsStore },
      { provide: 'NgProductTypesActions', useClass: NgProductTypesActions },
      { provide: 'NgProductTypesStore', useClass: NgProductTypesStore }
    ]
  ]
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
