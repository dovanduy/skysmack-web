import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { ProductTypeSalesPrice } from '../../models';
import { PRODUCT_TYPE_SALES_PRICE_REDUX_KEY } from '../../constants';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.ProductTypeSalesPrice (where ProductTypeSalesPrice is the reducer name.)
 */
export class ProductTypeSalesPriceAppState extends AppState {
    public productTypesSalesPrice: ProductTypeSalesPriceState;
}

export class ProductTypeSalesPriceState implements RecordState<ProductTypeSalesPrice, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<ProductTypeSalesPrice, number>>> = {};
}

export function productTypeSalesPriceReducer(state = new ProductTypeSalesPriceState(), action: ReduxAction, prefix: string = PRODUCT_TYPE_SALES_PRICE_REDUX_KEY): ProductTypeSalesPriceState {
    state = sharedReducer(state, action, new ProductTypeSalesPriceState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<ProductTypeSalesPriceState, ProductTypeSalesPrice, number>(state, action, prefix)
            };
        }
    }
}
