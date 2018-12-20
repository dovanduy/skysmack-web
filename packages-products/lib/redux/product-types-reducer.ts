import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { ProductType } from '../models/product-type';

/**
 * This is to be used when you want to access productsTypes via the GLOBAL state. E.g. state.productsTypes (where productsTypes is the reducer name.)
 */
export class ProductTypesAppState extends AppState {
    public productsTypes: ProductTypesState;
}

export class ProductTypesState implements DocumentRecordState<ProductType, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<ProductType>>> = {};
    public fields: StrIndex<LocalObject<FieldSchemaViewModel>[]> = {};
    public availableFields: StrIndex<LocalObject<FieldValueProviderViewModel>[]> = {};
}

export function productTypesReducer(state = new ProductTypesState(), action: ReduxAction, prefix: string = 'PRODUCT_TYPES_'): ProductTypesState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<ProductTypesState, ProductType, number>(state, action, prefix)
            };
    }
}
