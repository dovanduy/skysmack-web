import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { ProductType } from '../../../models/product-type';

/**
 * This is to be used when you want to access productsTypes via the GLOBAL state. E.g. state.productsTypes (where productsTypes is the reducer name.)
 */
export class ProductTypesAppState extends AppState {
    public productsTypes: ProductTypesState;
}

export class ProductTypesState implements RecordState<ProductType, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<ProductType, number>>> = {};
}

export function productTypesReducer(state = new ProductTypesState(), action: ReduxAction, prefix: string = 'PRODUCT_TYPES_'): ProductTypesState {
    state = sharedReducer(state, action, new ProductTypesState());
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<ProductTypesState, ProductType, number>(state, action, prefix)
            };
    }
}
