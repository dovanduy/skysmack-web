import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { PHONE_LOGS_REDUX_KEY, PHONE_LOGS_REDUCER_KEY } from '../../constants/constants';
import { PhoneLog } from '../../models/phone-log';

/**
 * This is to be used when you want to access phones via the GLOBAL state. E.g. state.phones (where phones is the reducer name.)
 */
export class PhoneLogsAppState extends AppState {
    public phoneLogs: PhoneLogsState;
}

export class PhoneLogsState implements RecordState<PhoneLog, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<PhoneLog, number>>> = {};
}

export function phoneLogsReducer(state = new PhoneLogsState(), action: ReduxAction, prefix: string = PHONE_LOGS_REDUX_KEY): PhoneLogsState {
    state = sharedReducer(state, action, new PhoneLogsState(), PHONE_LOGS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<PhoneLogsState, PhoneLog, number>(state, action, prefix)
            };
    }
}
