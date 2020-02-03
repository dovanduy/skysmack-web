import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { ACCESS_CONTROLLERS_REDUX_KEY, ACCESS_CONTROLLERS_REDUCER_KEY } from '../constants/constants';
import { AccessController, } from '../models/access-controller';

/**
 * This is to be used when you want to access access-controllers via the GLOBAL state. E.g. state.access-controllers (where access-controllers is the reducer name.)
 */
export class AccessControllersAppState extends AppState {
    public accessControllers: AccessControllersState;
}

export class AccessControllersState implements RecordState<AccessController, string> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<string>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AccessController, string>>> = {};
}

export function accessControllersReducer(state = new AccessControllersState(), action: ReduxAction, prefix: string = ACCESS_CONTROLLERS_REDUX_KEY): AccessControllersState {
    state = sharedReducer(state, action, new AccessControllersState(), ACCESS_CONTROLLERS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AccessControllersState, AccessController, string>(state, action, prefix)
            };
    }
}
