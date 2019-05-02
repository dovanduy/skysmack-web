import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase, StateKeyMeta } from '@skysmack/redux';
import { LodgingType } from '../../models/lodging-type';
import { LodgingTypesActions } from './lodging-types-actions';
import { LODGING_TYPES_REDUX_KEY } from '../../constants';

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
    public availableLodgingTypesCount: StrIndex<StrIndex<StrIndex<number>>> = {};
}

export function lodgingTypesReducer(state = new LodgingTypesState(), action: ReduxAction, prefix: string = LODGING_TYPES_REDUX_KEY): LodgingTypesState {
    state = sharedReducer(state, action, new LodgingTypesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<StrIndex<number[]>>, StateKeyMeta>;

            // Merge data
            const incoming = castedAction.payload;
            const current = newState.availableLodgingTypes[castedAction.meta.stateKey] ? newState.availableLodgingTypes[castedAction.meta.stateKey] : {};
            Object.keys(incoming).forEach((key) => current[key] = incoming[key]);

            newState.availableLodgingTypes[castedAction.meta.stateKey] = current;
            return newState;
        }
        case prefix + LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_FAILURE: {
            console.log('error:', action);
            return newState;
        }

        case prefix + LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_COUNT_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<StrIndex<number>>, StateKeyMeta>;

            // Merge data
            const incoming = castedAction.payload;
            const current = newState.availableLodgingTypesCount[castedAction.meta.stateKey] ? newState.availableLodgingTypesCount[castedAction.meta.stateKey] : {};

            Object.keys(incoming).forEach(someId => {
                Object.keys(incoming[someId]).forEach(date => {
                    current[someId] = current[someId] ? current[someId] : {};
                    current[someId][date] = incoming[someId][date]
                });
            });

            newState.availableLodgingTypesCount[castedAction.meta.stateKey] = current;

            return newState;
        }
        case prefix + LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_COUNT_FAILURE: {
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
