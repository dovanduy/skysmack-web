import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { LodgingReservationPriceChange } from '../../models/lodging-reservation-price-change';
import { LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.LodgingReservationPriceChanges (where LodgingReservationPriceChanges is the reducer name.)
 */
export class LodgingReservationPriceChangesAppState extends AppState {
    public lodgingReservationPriceChanges: LodgingReservationPriceChangesState;
}

export class LodgingReservationPriceChangesState implements RecordState<LodgingReservationPriceChange, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingReservationPriceChange, number>>> = {};
}

export function lodgingReservationPriceChangesReducer(state = new LodgingReservationPriceChangesState(), action: ReduxAction, prefix: string = LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY): LodgingReservationPriceChangesState {
    state = sharedReducer(state, action, new LodgingReservationPriceChangesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<LodgingReservationPriceChangesState, LodgingReservationPriceChange, number>(state, action, prefix)
            };
        }
    }
}
