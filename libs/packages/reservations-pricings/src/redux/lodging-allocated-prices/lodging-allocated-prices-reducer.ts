import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { LodgingAllocatedPrice } from '../../models/lodging-allocated-price';
import { LODGING_ALLOCATED_PRICES_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.LodgingAllocatedPrices (where LodgingAllocatedPrices is the reducer name.)
 */
export class LodgingAllocatedPricesAppState extends AppState {
    public lodgingAllocatedPrices: LodgingAllocatedPricesState;
}

export class LodgingAllocatedPricesState implements RecordState<LodgingAllocatedPrice, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingAllocatedPrice, number>>> = {};
}

export function lodgingAllocatedPricesReducer(state = new LodgingAllocatedPricesState(), action: ReduxAction, prefix: string = LODGING_ALLOCATED_PRICES_REDUX_KEY): LodgingAllocatedPricesState {
    state = sharedReducer(state, action, new LodgingAllocatedPricesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<LodgingAllocatedPricesState, LodgingAllocatedPrice, number>(state, action, prefix)
            };
        }
    }
}
