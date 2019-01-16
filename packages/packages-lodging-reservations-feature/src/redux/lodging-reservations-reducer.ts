import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState } from '@skysmack/redux';
import { LodgingReservation } from '../models/lodging-reservation';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.lodgingReservations (where lodgingReservations is the reducer name.)
 */
export class LodgingReservationsAppState extends AppState {
    public LodgingReservations: LodgingReservationsState;
}

export class LodgingReservationsState implements RecordState<LodgingReservation, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingReservation, number>>> = {};
}

export function lodgingReservationsReducer(state = new LodgingReservationsState(), action: ReduxAction, prefix: string = 'LODGING_RESERVATIONS_'): LodgingReservationsState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<LodgingReservationsState, LodgingReservation, number>(state, action, prefix)
            };
    }
}
