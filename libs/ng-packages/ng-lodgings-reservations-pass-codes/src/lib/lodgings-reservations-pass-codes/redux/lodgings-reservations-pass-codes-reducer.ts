import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY, LODGINGS_RESERVATIONS_PASS_CODES_REDUCER_KEY } from '../constants/constants';
import { LodgingReservationPassCode, LodgingReservationPassCodeKey } from '../models/lodging-reservation-pass-code';

/**
 * This is to be used when you want to access lodgings-reservations-pass-codes via the GLOBAL state. E.g. state.lodgings-reservations-pass-codes (where lodgings-reservations-pass-codes is the reducer name.)
 */
export class LodgingsReservationsPassCodesAppState extends AppState {
    public lodgingsReservationsPassCodes: LodgingsReservationsPassCodesState;
}

export class LodgingsReservationsPassCodesState implements RecordState<LodgingReservationPassCode, LodgingReservationPassCodeKey> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<LodgingReservationPassCodeKey>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingReservationPassCode, LodgingReservationPassCodeKey>>> = {};
}

export function lodgingsReservationsPassCodesReducer(state = new LodgingsReservationsPassCodesState(), action: ReduxAction, prefix: string = LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY): LodgingsReservationsPassCodesState {
    state = sharedReducer(state, action, new LodgingsReservationsPassCodesState(), LODGINGS_RESERVATIONS_PASS_CODES_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<LodgingsReservationsPassCodesState, LodgingReservationPassCode, LodgingReservationPassCodeKey>(state, action, prefix)
            };
    }
}
