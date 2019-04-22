import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase, StateKeyMeta } from '@skysmack/redux';
import { Lodging } from '../../models/lodging';
import { LodgingsActions } from './lodging-actions';
import { LODGINGS_REDUX_KEY } from '../../constants';

/**
 * This is to be used when you want to access lodgings via the GLOBAL state. E.g. state.lodgings (where lodgings is the reducer name.)
 */
export class LodgingsAppState extends AppState {
    public lodgings: LodgingsState;
}

export class LodgingsState implements RecordState<Lodging, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Lodging, number>>> = {};
    public availableLodgings: StrIndex<StrIndex<number[]>> = {};
}

export function lodgingsReducer(state = new LodgingsState(), action: ReduxAction, prefix: string = LODGINGS_REDUX_KEY): LodgingsState {
    state = sharedReducer(state, action, new LodgingsState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + LodgingsActions.GET_AVAILABLE_LODGINGS_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<number[]>, StateKeyMeta>;
            // TODO: Merge available lodgings instead of overwriting them.
            newState.availableLodgings[castedAction.meta.stateKey] = castedAction.payload;
            return newState;
        }
        case prefix + LodgingsActions.GET_AVAILABLE_LODGINGS_FAILURE: {
            console.log('error:', action);
            return newState;
        }

        default:
            return {
                ...state,
                ...recordReducersBase<LodgingsState, Lodging, number>(state, action, prefix)
            };
    }
}
