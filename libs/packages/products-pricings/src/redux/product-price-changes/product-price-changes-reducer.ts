import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { ProductPriceChange } from '../../models';
import { PRODUCT_PRICE_CHANGES_REDUX_KEY, PRODUCT_PRICE_CHANGES_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.ProductPriceChanges (where ProductPriceChanges is the reducer name.)
 */
export class ProductPriceChangesAppState extends AppState {
    public productPriceChanges: ProductPriceChangesState;
}

export class ProductPriceChangesState implements RecordState<ProductPriceChange, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<ProductPriceChange, number>>> = {};
}

export function productPriceChangesReducer(state = new ProductPriceChangesState(), action: ReduxAction, prefix: string = PRODUCT_PRICE_CHANGES_REDUX_KEY): ProductPriceChangesState {
    state = sharedReducer(state, action, new ProductPriceChangesState(), PRODUCT_PRICE_CHANGES_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<ProductPriceChangesState, ProductPriceChange, number>(state, action, prefix)
            };
        }
    }
}
