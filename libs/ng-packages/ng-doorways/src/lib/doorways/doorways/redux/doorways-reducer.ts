import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { Doorway } from '../../models/doorway';
import { DOORWAYS_REDUCER_KEY, DOORWAYS_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access doorways via the GLOBAL state. E.g. state.doorways (where doorways is the reducer name.)
 */
export class DoorwaysAppState extends AppState {
    public doorways: DoorwaysState;
}

export class DoorwaysState implements RecordState<Doorway, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Doorway, number>>> = {};
}

export function doorwaysReducer(state = new DoorwaysState(), action: ReduxAction, prefix: string = DOORWAYS_REDUX_KEY): DoorwaysState {
    state = sharedReducer(state, action, new DoorwaysState(), DOORWAYS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<DoorwaysState, Doorway, number>(state, action, prefix)
            };
    }
}
