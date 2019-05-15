import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { LodgingReservationPriceChange } from '../../models/lodging-reservation-price-change';
import { LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.LodgingTypeReservationPriceChanges (where LodgingTypeReservationPriceChanges is the reducer name.)
 */
export class LodgingTypeReservationPriceChangesAppState extends AppState {
    public lodgingTypeReservationPriceChanges: LodgingTypeReservationPriceChangesState;
}

export class LodgingTypeReservationPriceChangesState implements RecordState<LodgingReservationPriceChange, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingReservationPriceChange, number>>> = {};
}

export function lodgingTypeReservationPriceChangesReducer(state = new LodgingTypeReservationPriceChangesState(), action: ReduxAction, prefix: string = LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUX_KEY): LodgingTypeReservationPriceChangesState {
    state = sharedReducer(state, action, new LodgingTypeReservationPriceChangesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        default: {
            return {
                ...state,
                ...recordReducersBase<LodgingTypeReservationPriceChangesState, LodgingReservationPriceChange, number>(state, action, prefix)
            };
        }
    }
}
