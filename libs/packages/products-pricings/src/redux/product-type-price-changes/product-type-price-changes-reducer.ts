import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { ProductPriceChange } from '../../models';
import { PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY, PRODUCT_TYPE_PRICE_CHANGES_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.ProductTypePriceChanges (where ProductTypePriceChanges is the reducer name.)
 */
export class ProductTypePriceChangesAppState extends AppState {
    public productTypePriceChanges: ProductTypePriceChangesState;
}

export class ProductTypePriceChangesState implements RecordState<ProductPriceChange, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<ProductPriceChange, number>>> = {};
}

export function productTypePriceChangesReducer(state = new ProductTypePriceChangesState(), action: ReduxAction, prefix: string = PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY): ProductTypePriceChangesState {
    state = sharedReducer(state, action, new ProductTypePriceChangesState(), PRODUCT_TYPE_PRICE_CHANGES_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<ProductTypePriceChangesState, ProductPriceChange, number>(state, action, prefix)
            };
        }
    }
}
