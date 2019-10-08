import { StrIndex, LocalObject, LocalObjectExtensions, toLocalObject, HttpErrorResponse, GlobalProperties } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer } from '@skysmack/redux';
import { ASSIGNMENT_TYPES_REDUX_KEY, ASSIGNMENT_TYPES_REDUCER_KEY } from '../../constants';
import { Assignment } from '../../models/assignment';
import { AssignmentsActions } from './assignments-actions';


/**
 * This is to be used when you want to access assignmentsTypes via the GLOBAL state. E.g. state.assignmentsTypes (where assignmentsTypes is the reducer name.)
 */
export class AssignmentsAppState extends AppState {
    public assignments: AssignmentsState;
}

export class AssignmentsState {
    public localRecords: StrIndex<StrIndex<LocalObject<Assignment, number>>> = {};
}

export function assignmentsReducer(state = new AssignmentsState(), action: ReduxAction, prefix: string = ASSIGNMENT_TYPES_REDUX_KEY): AssignmentsState {
    state = sharedReducer(state, action, new AssignmentsState(), ASSIGNMENT_TYPES_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case AssignmentsActions.ASSIGNMENTS_GET_SUCCESS: {
            // TODO: Replace any
            const castedAction = action as ReduxAction<any>;
            newState.localRecords[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[castedAction.payload.packagePath], castedAction.payload.entities.map(x => toLocalObject(x, undefined)));
        }
        case AssignmentsActions.ASSIGNMENTS_GET_FAILURE: {
            const castedAction = action as ReduxAction<HttpErrorResponse>;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        default:
            return state;
    }
}
