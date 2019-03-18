import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase, StateKeyMeta } from '@skysmack/redux';
import { LodgingType } from '../models/lodging-type';
import { LodgingTypesActions } from './lodging-types-actions';

/**
 * This is to be used when you want to access lodgingsTypes via the GLOBAL state. E.g. state.lodgingsTypes (where lodgingsTypes is the reducer name.)
 */
export class LodgingTypesAppState extends AppState {
    public lodgingTypes: LodgingTypesState;
}

export class LodgingTypesState implements RecordState<LodgingType, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingType, number>>> = {};
    public availableLodgingTypes: StrIndex<StrIndex<StrIndex<number[]>>> = {};
}

export function lodgingTypesReducer(state = new LodgingTypesState(), action: ReduxAction, prefix: string = 'LODGING_TYPES_'): LodgingTypesState {
    state = sharedReducer(state, action, new LodgingTypesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<StrIndex<number[]>>, StateKeyMeta>;
            // TODO: Merge available lodgings instead of overwriting them.
            newState.availableLodgingTypes[castedAction.meta.stateKey] = castedAction.payload;
            return newState;
        }
        case prefix + LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_FAILURE: {
            console.log('error:', action);
            return newState;
        }
        default:
            return {
                ...state,
                ...recordReducersBase<LodgingTypesState, LodgingType, number>(state, action, prefix)
            };
    }
}
