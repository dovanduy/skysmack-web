import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Product } from '../../../models/product';
import { PRODUCTS_REDUX_KEY, PRODUCTS_REDUCER_KEY } from '../../../constants';

/**
 * This is to be used when you want to access products via the GLOBAL state. E.g. state.products (where products is the reducer name.)
 */
export class ProductsAppState extends AppState {
    public products: ProductsState;
}

export class ProductsState implements RecordState<Product, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Product, number>>> = {};
}

export function productsReducer(state = new ProductsState(), action: ReduxAction, prefix: string = PRODUCTS_REDUX_KEY): ProductsState {
    state = sharedReducer(state, action, new ProductsState(), PRODUCTS_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<ProductsState, Product, number>(state, action, prefix)
            };
    }
}
