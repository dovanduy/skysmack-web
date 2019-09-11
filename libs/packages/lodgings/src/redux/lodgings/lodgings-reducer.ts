import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Lodging } from '../../models/lodging';
import { LODGINGS_REDUX_KEY, LODGINGS_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access lodgings via the GLOBAL state. E.g. state.lodgings (where lodgings is the reducer name.)
 */
export class LodgingsAppState extends AppState {
    public lodgings: LodgingsState;
}

export class LodgingsState implements RecordState<Lodging, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Lodging, number>>> = {};
    public availableLodgings: StrIndex<StrIndex<StrIndex<boolean>>> = {};
    public availableLodgingsDaily: StrIndex<StrIndex<number[]>> = {};
}

export function lodgingsReducer(state = new LodgingsState(), action: ReduxAction, prefix: string = LODGINGS_REDUX_KEY): LodgingsState {
    state = sharedReducer(state, action, new LodgingsState(), LODGINGS_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<LodgingsState, Lodging, number>(state, action, prefix)
            };
    }
}
