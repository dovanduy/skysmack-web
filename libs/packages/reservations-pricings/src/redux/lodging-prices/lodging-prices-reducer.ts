import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { LODGING_PRICES_REDUX_KEY } from '../../constants/constants';
import { LodgingPrice } from '../../models/lodging-price';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.LodgingPrices (where LodgingPrices is the reducer name.)
 */
export class LodgingPricesAppState extends AppState {
    public lodgingPrices: LodgingPricesState;
}

export class LodgingPricesState implements RecordState<LodgingPrice, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingPrice, number>>> = {};
}

export function lodgingPricesReducer(state = new LodgingPricesState(), action: ReduxAction, prefix: string = LODGING_PRICES_REDUX_KEY): LodgingPricesState {
    state = sharedReducer(state, action, new LodgingPricesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<LodgingPricesState, LodgingPrice, number>(state, action, prefix)
            };
        }
    }
}
