import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { DoorwayOption } from '../models/doorway-option';
import { DOORWAYS_OPTIONS_REDUX_KEY, DOORWAYS_OPTIONS_REDUCER_KEY } from '../constants/constants';

/**
 * This is to be used when you want to access doorways-options via the GLOBAL state. E.g. state.doorways-options (where doorways-options is the reducer name.)
 */
export class DoorwaysOptionsAppState extends AppState {
    public doorwaysOptions: DoorwaysOptionsState;
}

export class DoorwaysOptionsState implements RecordState<DoorwayOption, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<DoorwayOption, number>>> = {};
}

export function doorwaysOptionsReducer(state = new DoorwaysOptionsState(), action: ReduxAction, prefix: string = DOORWAYS_OPTIONS_REDUX_KEY): DoorwaysOptionsState {
    state = sharedReducer(state, action, new DoorwaysOptionsState(), DOORWAYS_OPTIONS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<DoorwaysOptionsState, DoorwayOption, number>(state, action, prefix)
            };
    }
}
