import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { LodgingAllocatedPrice } from '../../models/lodging-allocated-price';
import { LODGING_TYPE_ALLOCATED_PRICES_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.LodgingTypeAllocatedPrices (where LodgingTypeAllocatedPrices is the reducer name.)
 */
export class LodgingTypeAllocatedPricesAppState extends AppState {
    public lodgingTypeAllocatedPrices: LodgingTypeAllocatedPricesState;
}

export class LodgingTypeAllocatedPricesState implements RecordState<LodgingAllocatedPrice, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingAllocatedPrice, number>>> = {};
}

export function lodgingTypeAllocatedPricesReducer(state = new LodgingTypeAllocatedPricesState(), action: ReduxAction, prefix: string = LODGING_TYPE_ALLOCATED_PRICES_REDUX_KEY): LodgingTypeAllocatedPricesState {
    state = sharedReducer(state, action, new LodgingTypeAllocatedPricesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<LodgingTypeAllocatedPricesState, LodgingAllocatedPrice, number>(state, action, prefix)
            };
        }
    }
}
