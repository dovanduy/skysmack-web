import { StrIndex, LocalObject, toLocalObject, HttpErrorResponse, GlobalProperties, Record, LocalObjectStatus, LocalObjectExtensions } from '@skysmack/framework';
import { AppState, ReduxAction, AuthenticationActions, RollbackMeta, ReduxOfflineMeta, sharedReducer } from '@skysmack/redux';
import { ASSIGNMENT_TYPES_REDUX_KEY, SINGLE_ASSIGNMENTS_REDUX_KEY } from '../../constants';
import { Assignment, AssignmentKey } from '../../models/assignment';
import { AssignmentsActions } from './assignments-actions';
import { SingleAssignmentsActions } from '../single-assignments';
import { SingleAssignment } from '../../models';


/**
 * This is to be used when you want to access assignmentsTypes via the GLOBAL state. E.g. state.assignmentsTypes (where assignmentsTypes is the reducer name.)
 */
export class AssignmentsAppState extends AppState {
    public assignments: AssignmentsState;
}

export class AssignmentsState {
    public localRecords: StrIndex<StrIndex<LocalObject<Assignment, AssignmentKey>>> = {};
}

export function assignmentsReducer(state = new AssignmentsState(), action: any, prefix: string = ASSIGNMENT_TYPES_REDUX_KEY): AssignmentsState {
    const newState = Object.assign({}, state);
    state = sharedReducer(state, action, new AssignmentsState(), ASSIGNMENT_TYPES_REDUX_KEY);

    switch (action.type) {
        case AssignmentsActions.ASSIGNMENTS_GET_SUCCESS: {
            const castedAction = action as ReduxAction<{ entities: Assignment[], packagePath: string, from: Date, due: Date }>;
            newState.localRecords[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[castedAction.payload.packagePath], castedAction.payload.entities.map(x => toLocalObject(x)));

            return newState;
        }

        // Single Assignment updates
        case SINGLE_ASSIGNMENTS_REDUX_KEY + SingleAssignmentsActions.UPDATE: {
            // const castedAction: ReduxAction<null, ReduxOfflineMeta<SingleAssignment[], HttpResponse, LocalObject<SingleAssignment, number>[]>> = action;
            // const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            // const recordsToBeUpdated = castedAction.meta.offline.commit.meta.value;

            // recordsToBeUpdated.map(record => {
            //     const key = `${record.object.from}:${record.object.due}`;
            //     newState.localRecords[stateKey][key] = newState.localRecords[stateKey][key].map(oldRecord => {
            //         if (oldRecord.object.id === record.object.id) {
            //             oldRecord.object.status = record.object.status;
            //             oldRecord.status = LocalObjectStatus.MODIFYING;
            //         }
            //         return oldRecord;
            //     });
            // });

            return newState;
        }

        case SINGLE_ASSIGNMENTS_REDUX_KEY + SingleAssignmentsActions.UPDATE_SUCCESS: {
            return newState;
        }

        case SINGLE_ASSIGNMENTS_REDUX_KEY + SingleAssignmentsActions.UPDATE_FAILURE: {
            return newState;
        }

        case AssignmentsActions.ASSIGNMENTS_GET_FAILURE: {
            const castedAction = action as ReduxAction<HttpErrorResponse>;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case AuthenticationActions.LOG_OUT: {
            return new AssignmentsState();
        }
        default:
            return state;
    }
}

function setActionError<TRecord extends Record<TKey>, TKey>(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<TRecord, TKey>[]>>, message: string = 'Error: '): void {
    action.meta.value.forEach(record => {
        record.error = true;
        if (!record.object.id) {
            record.object.id = 0 as any;
        }
    });
    if (!GlobalProperties.production) {
        console.log(message, action);
    }
}