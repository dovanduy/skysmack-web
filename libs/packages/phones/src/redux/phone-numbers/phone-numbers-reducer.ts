import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { PHONE_NUMBERS_REDUX_KEY, PHONE_NUMBERS_REDUCER_KEY } from '../../constants/constants';
import { PhoneNumber } from '../../models/phone-number';

/**
 * This is to be used when you want to access phones via the GLOBAL state. E.g. state.phones (where phones is the reducer name.)
 */
export class PhoneNumbersAppState extends AppState {
    public phoneNumbers: PhoneNumbersState;
}

export class PhoneNumbersState implements RecordState<PhoneNumber, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<PhoneNumber, number>>> = {};
}

export function phoneNumbersReducer(state = new PhoneNumbersState(), action: ReduxAction, prefix: string = PHONE_NUMBERS_REDUX_KEY): PhoneNumbersState {
    state = sharedReducer(state, action, new PhoneNumbersState(), PHONE_NUMBERS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<PhoneNumbersState, PhoneNumber, number>(state, action, prefix)
            };
    }
}
