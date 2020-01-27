import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { DoorwayPassCode, DoorwayPassCodeKey } from '../models/doorway-pass-code';
import { DOORWAYS_PASS_CODES_REDUX_KEY, DOORWAYS_PASS_CODES_REDUCER_KEY } from '../constants/constants';

/**
 * This is to be used when you want to access doorways-pass-codes via the GLOBAL state. E.g. state.doorways-pass-codes (where doorways-pass-codes is the reducer name.)
 */
export class DoorwaysPassCodesAppState extends AppState {
    public doorwaysPassCodes: DoorwaysPassCodesState;
}

export class DoorwaysPassCodesState implements RecordState<DoorwayPassCode, DoorwayPassCodeKey> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<DoorwayPassCodeKey>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<DoorwayPassCode, DoorwayPassCodeKey>>> = {};
}

export function doorwaysPassCodesReducer(state = new DoorwaysPassCodesState(), action: ReduxAction, prefix: string = DOORWAYS_PASS_CODES_REDUX_KEY): DoorwaysPassCodesState {
    state = sharedReducer(state, action, new DoorwaysPassCodesState(), DOORWAYS_PASS_CODES_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<DoorwaysPassCodesState, DoorwayPassCode, DoorwayPassCodeKey>(state, action, prefix)
            };
    }
}
