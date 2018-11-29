import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { ProductTypes } from '../models/product-types';

/**
 * This is to be used when you want to access productsTypes via the GLOBAL state. E.g. state.productsTypes (where productsTypes is the reducer name.)
 */
export class ProductTypesAppState extends AppState {
    public ProductsTypes: ProductTypesState;
}

export class ProductTypesState implements DocumentRecordState<ProductTypes, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<ProductTypes>>> = {};
    public fields: StrIndex<LocalObject<FieldSchemaViewModel>[]> = {};
    public availableFields: StrIndex<FieldValueProviderViewModel[]> = {};
}

export function productTypesReducer(state = new ProductTypesState(), action: ReduxAction, prefix: string = 'PRODUCT.TYPES_'): ProductTypesState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<ProductTypesState, ProductTypes, number>(state, action, prefix)
            };
    }
}
