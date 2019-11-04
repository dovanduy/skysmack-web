import { StrIndex, LocalObject, toLocalObject, HttpErrorResponse, GlobalProperties, Record, LocalObjectStatus, LocalObjectExtensions, HttpResponse } from '@skysmack/framework';
import { AppState, ReduxAction, AuthenticationActions, RollbackMeta, ReduxOfflineMeta, sharedReducer } from '@skysmack/redux';
import { ASSIGNMENT_TYPES_REDUX_KEY, SINGLE_ASSIGNMENTS_REDUX_KEY, ASSIGNMENTS_SCHEDULES_REDUX_KEY } from '../../constants';
import { Assignment, AssignmentKey } from '../../models/assignment';
import { AssignmentsActions } from './assignments-actions';
import { SingleAssignmentsActions } from '../single-assignments';
import { SingleAssignment, ScheduledAssignment, ScheduledAssignmentKey } from '../../models';
import { AssignmentsSchedulesActions } from '../assignments-schedules/assignments-schedules-actions';


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
            const castedAction: ReduxAction<null, ReduxOfflineMeta<SingleAssignment[], HttpResponse, LocalObject<SingleAssignment, number>[]>> = action;
            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const recordsToBeUpdated = castedAction.meta.offline.commit.meta.value;

            const assignmentsToBeUpdated = recordsToBeUpdated.map(singleAssignment => {
                const dict = newState.localRecords[stateKey];
                const assignment = Object.keys(dict).map(key => dict[key]).find(assignment => JSON.stringify(assignment.object.id) === JSON.stringify({ id: singleAssignment.object.id }));
                if (assignment) {
                    assignment.object.status = singleAssignment.object.status;
                }
                return assignment;
            }).filter(x => x);


            newState.localRecords[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[stateKey], assignmentsToBeUpdated, LocalObjectStatus.OK);

            return newState;
        }

        case SINGLE_ASSIGNMENTS_REDUX_KEY + SingleAssignmentsActions.UPDATE_SUCCESS: {
            return newState;
        }

        case SINGLE_ASSIGNMENTS_REDUX_KEY + SingleAssignmentsActions.UPDATE_FAILURE: {
            return newState;
        }

        // Scheduled assignment change
        case ASSIGNMENTS_SCHEDULES_REDUX_KEY + AssignmentsSchedulesActions.CHANGES_PUT: {
            const castedAction: ReduxAction<null, ReduxOfflineMeta<[], HttpResponse, LocalObject<ScheduledAssignment, ScheduledAssignmentKey>[]>> = action;

            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const recordsToBeUpdated = castedAction.meta.offline.commit.meta.value;

            const assignmentsToBeUpdated = recordsToBeUpdated.map(scheduledAssignment => {
                const dict = newState.localRecords[stateKey];
                const assignment = Object.keys(dict).map(key => dict[key]).find(assignment => JSON.stringify(assignment.object.id) === JSON.stringify({
                    id: scheduledAssignment.object.id.scheduleId,
                    originalTime: scheduledAssignment.object.id.originalTime
                }));

                if (assignment) {
                    assignment.object.status = scheduledAssignment.object.status;
                }
                return assignment;
            }).filter(x => x);

            newState.localRecords[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[stateKey], assignmentsToBeUpdated, LocalObjectStatus.OK);

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