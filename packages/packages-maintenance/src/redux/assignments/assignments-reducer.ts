import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase, sharedReducer } from '@skysmack/redux';
import { Assignment } from '../../models/assignment';
import { ASSIGNMENTS_REDUX_KEY } from '../../constants';

/**
 * This is to be used when you want to access assignment via the GLOBAL state. E.g. state.assignment (where assignment is the reducer name.)
 */
export class AssignmentsAppState extends AppState {
    public assignment: AssignmentsState;
}

export class AssignmentsState implements RecordState<Assignment, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Assignment, number>>> = {};
}

export function assignmentReducer(state = new AssignmentsState(), action: ReduxAction, prefix: string = ASSIGNMENTS_REDUX_KEY): AssignmentsState {
    state = sharedReducer(state, action, new AssignmentsState());
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AssignmentsState, Assignment, number>(state, action, prefix)
            };
    }
}