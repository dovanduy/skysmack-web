import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Phone } from '../../models/phone';
import { sharedReducer } from '@skysmack/redux';
import { PHONES_REDUX_KEY, PHONES_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access phones via the GLOBAL state. E.g. state.phones (where phones is the reducer name.)
 */
export class PhonesAppState extends AppState {
    public phones: PhonesState;
}

export class PhonesState implements RecordState<Phone, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Phone, number>>> = {};
}

export function phonesReducer(state = new PhonesState(), action: ReduxAction, prefix: string = PHONES_REDUX_KEY): PhonesState {
    state = sharedReducer(state, action, new PhonesState(), PHONES_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<PhonesState, Phone, number>(state, action, prefix)
            };
    }
}
