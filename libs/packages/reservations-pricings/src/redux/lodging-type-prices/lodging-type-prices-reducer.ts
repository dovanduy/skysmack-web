import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { LODGING_TYPE_PRICES_REDUX_KEY } from '../../constants/constants';
import { LodgingTypePrice } from '../../models/lodging-type-price';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.LodgingTypePrices (where LodgingTypePrices is the reducer name.)
 */
export class LodgingTypePricesAppState extends AppState {
    public lodgingTypePrices: LodgingTypePricesState;
}

export class LodgingTypePricesState implements RecordState<LodgingTypePrice, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingTypePrice, number>>> = {};
}

export function lodgingTypePricesReducer(state = new LodgingTypePricesState(), action: ReduxAction, prefix: string = LODGING_TYPE_PRICES_REDUX_KEY): LodgingTypePricesState {
    state = sharedReducer(state, action, new LodgingTypePricesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<LodgingTypePricesState, LodgingTypePrice, number>(state, action, prefix)
            };
        }
    }
}
