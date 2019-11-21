import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { PassCode } from '../../models/pass-code';
import { sharedReducer } from '@skysmack/redux';
import { PASS_CODES_REDUX_KEY, PASS_CODES_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access passCodes via the GLOBAL state. E.g. state.passCodes (where passCodes is the reducer name.)
 */
export class PassCodesAppState extends AppState {
    public passCodes: PassCodesState;
}

export class PassCodesState implements RecordState<PassCode, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<PassCode, number>>> = {};
}

export function passCodesReducer(state = new PassCodesState(), action: ReduxAction, prefix: string = PASS_CODES_REDUX_KEY): PassCodesState {
    state = sharedReducer(state, action, new PassCodesState(), PASS_CODES_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<PassCodesState, PassCode, number>(state, action, prefix)
            };
    }
}
