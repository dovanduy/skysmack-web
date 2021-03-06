import { LocalPageTypes, StrIndex, LocalObject, NumIndex } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Lodging } from '../../models/lodging';
import { LODGINGS_REDUX_KEY, LODGINGS_REDUCER_KEY } from '../../constants';
import { LodgingsActions } from './lodging-actions';

/**
 * This is to be used when you want to access lodgings via the GLOBAL state. E.g. state.lodgings (where lodgings is the reducer name.)
 */
export class LodgingsAppState extends AppState {
    public lodgings: LodgingsState;
}

export class LodgingsState implements RecordState<Lodging, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Lodging, number>>> = {};
    public availableLodgings: StrIndex<StrIndex<NumIndex<boolean>>> = {};
    public availableLodgingsDaily: StrIndex<StrIndex<NumIndex<boolean>>> = {};
}

export function lodgingsReducer(state = new LodgingsState(), action: ReduxAction, prefix: string = LODGINGS_REDUX_KEY): LodgingsState {
    state = sharedReducer(state, action, new LodgingsState(), LODGINGS_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + LodgingsActions.GET_AVAILABLE_LODGINGS_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<boolean>, { stateKey: string, dateKey: string, ids: number[] }>;

            const incoming = castedAction.payload;
            const current = newState.availableLodgings[castedAction.meta.stateKey] ? newState.availableLodgings[castedAction.meta.stateKey] : {};

            const ids = Object.keys(incoming);
            for (let dateIndex = 0; dateIndex < ids.length; dateIndex++) {
                const id = ids[dateIndex];
                if (!current[castedAction.meta.dateKey]) {
                    current[castedAction.meta.dateKey] = {};
                }

                for (let index = 0; index < castedAction.meta.ids.length; index++) {
                    if (incoming[id] !== undefined && incoming[id] !== null) {
                        current[castedAction.meta.dateKey][id] = incoming[id];
                    }
                }
            }

            newState.availableLodgings[castedAction.meta.stateKey] = current;

            return newState;
        }
        case prefix + LodgingsActions.GET_AVAILABLE_LODGINGS_FAILURE: {
            console.log('error:', action);
            return newState;
        }

        case prefix + LodgingsActions.GET_AVAILABLE_LODGINGS_DAILY_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<number[]>, { stateKey: string, ids: number[] }>;

            // Merge data
            const incoming = castedAction.payload;
            const current = newState.availableLodgingsDaily[castedAction.meta.stateKey] ? newState.availableLodgingsDaily[castedAction.meta.stateKey] : {};

            const dates = Object.keys(incoming);
            for (let dateIndex = 0; dateIndex < dates.length; dateIndex++) {
                const date = dates[dateIndex];
                if (!current[date]) {
                    current[date] = {};
                }

                for (let index = 0; index < castedAction.meta.ids.length; index++) {
                    const id = castedAction.meta.ids[index];
                    if (incoming[date]) {
                        current[date][id] = incoming[date].includes(id);
                    }
                }
            }

            newState.availableLodgingsDaily[castedAction.meta.stateKey] = current;
            return newState;
        }
        case prefix + LodgingsActions.GET_AVAILABLE_LODGINGS_DAILY_FAILURE: {
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
