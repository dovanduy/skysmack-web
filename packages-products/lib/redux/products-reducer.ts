import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Product } from './../models/product';

/**
 * This is to be used when you want to access products via the GLOBAL state. E.g. state.products (where products is the reducer name.)
 */
export class ProductsAppState extends AppState {
    public products: ProductsState;
}

export class ProductsState implements DocumentRecordState<Product, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Product>>> = {};
    public fields: StrIndex<LocalObject<FieldSchemaViewModel>[]> = {};
    public availableFields: StrIndex<FieldValueProviderViewModel[]> = {};
}

export function productsReducer(state = new ProductsState(), action: ReduxAction, prefix: string = 'PRODUCTS_'): ProductsState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<ProductsState, Product, number>(state, action, prefix)
            };
    }
}
