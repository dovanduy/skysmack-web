import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { ProductsSalesPrice } from '../../models';
import { PRODUCTS_SALES_PRICE_REDUX_KEY } from '../../constants';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.ProductsSalesPrice (where ProductsSalesPrice is the reducer name.)
 */
export class ProductsSalesPriceAppState extends AppState {
    public productsSalesPrice: ProductsSalesPriceState;
}

export class ProductsSalesPriceState implements RecordState<ProductsSalesPrice, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<ProductsSalesPrice, number>>> = {};
}

export function productsSalesPriceReducer(state = new ProductsSalesPriceState(), action: ReduxAction, prefix: string = PRODUCTS_SALES_PRICE_REDUX_KEY): ProductsSalesPriceState {
    state = sharedReducer(state, action, new ProductsSalesPriceState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<ProductsSalesPriceState, ProductsSalesPrice, number>(state, action, prefix)
            };
        }
    }
}
