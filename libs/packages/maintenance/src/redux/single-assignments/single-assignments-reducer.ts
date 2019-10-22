import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase, sharedReducer } from '@skysmack/redux';
import { SINGLE_ASSIGNMENTS_REDUX_KEY, SINGLE_ASSIGNMENTS_REDUCER_KEY } from '../../constants';
import { SingleAssignment } from '../../models/single-assignment';

/**
 * This is to be used when you want to access assignment via the GLOBAL state. E.g. state.assignment (where assignment is the reducer name.)
 */
export class SingleAssignmentsAppState extends AppState {
    public singleAssignments: SingleAssignmentsState;
}

export class SingleAssignmentsState implements RecordState<SingleAssignment, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<SingleAssignment, number>>> = {};
}

export function singleAssignmentsReducer(state = new SingleAssignmentsState(), action: ReduxAction, prefix: string = SINGLE_ASSIGNMENTS_REDUX_KEY): SingleAssignmentsState {
    state = sharedReducer(state, action, new SingleAssignmentsState(), SINGLE_ASSIGNMENTS_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<SingleAssignmentsState, SingleAssignment, number>(state, action, prefix)
            };
    }
}
