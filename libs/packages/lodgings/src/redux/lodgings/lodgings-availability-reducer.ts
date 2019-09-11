import { StrIndex } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, StateKeyMeta } from '@skysmack/redux';
import { LODGINGS_REDUX_KEY, LODGINGS_REDUCER_KEY } from '../../constants';
import { LodgingsAvailabilityActions } from './lodging-availability-actions';

/**
 * This is to be used when you want to access lodgings via the GLOBAL state. E.g. state.lodgings (where lodgings is the reducer name.)
 */
export class LodgingsAvailabilityAppState extends AppState {
    public lodgingsAvailability: LodgingsAvailabilityState;
}

export class LodgingsAvailabilityState {
    public availableLodgings: StrIndex<StrIndex<StrIndex<boolean>>> = {};
    public availableLodgingsDaily: StrIndex<StrIndex<number[]>> = {};
}

export function lodgingsAvailabilityReducer(state = new LodgingsAvailabilityState(), action: ReduxAction, prefix: string = LODGINGS_REDUX_KEY): LodgingsAvailabilityState {
    state = sharedReducer(state, action, new LodgingsAvailabilityState(), LODGINGS_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + LodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<boolean>, { stateKey: string, dateKey: string }>;

            // Merge data
            const incoming = castedAction.payload;
            const currentState = newState.availableLodgings[castedAction.meta.stateKey] ? newState.availableLodgings[castedAction.meta.stateKey] : {};
            const currentSubState = currentState[castedAction.meta.dateKey] ? currentState[castedAction.meta.dateKey] : {};

            Object.keys(incoming).forEach((incomingKey) => currentSubState[incomingKey] = incoming[incomingKey]);

            newState.availableLodgings[castedAction.meta.stateKey] = currentState;
            newState.availableLodgings[castedAction.meta.stateKey][castedAction.meta.dateKey] = currentSubState;

            return newState;
        }
        case prefix + LodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_FAILURE: {
            console.log('error:', action);
            return newState;
        }

        case prefix + LodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_DAILY_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<number[]>, StateKeyMeta>;

            // Merge data
            const incoming = castedAction.payload;
            const current = newState.availableLodgingsDaily[castedAction.meta.stateKey] ? newState.availableLodgingsDaily[castedAction.meta.stateKey] : {};
            Object.keys(incoming).forEach((incomingKey) => current[incomingKey] = incoming[incomingKey]);

            newState.availableLodgingsDaily[castedAction.meta.stateKey] = current;
            return newState;
        }
        case prefix + LodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_DAILY_FAILURE: {
            console.log('error:', action);
            return newState;
        }

        default:
            return state;
    }
}
