import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase, sharedReducer } from '@skysmack/redux';
import { AssignmentType } from '../../models/assignment-type';
import { ASSIGNMENT_TYPES_REDUX_KEY, ASSIGNMENT_TYPES_REDUCER_KEY } from '../../constants';


/**
 * This is to be used when you want to access assignmentsTypes via the GLOBAL state. E.g. state.assignmentsTypes (where assignmentsTypes is the reducer name.)
 */
export class AssignmentTypesAppState extends AppState {
    public assignmentTypes: AssignmentTypesState;
}

export class AssignmentTypesState implements RecordState<AssignmentType, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AssignmentType, number>>> = {};
}

export function assignmentTypesReducer(state = new AssignmentTypesState(), action: ReduxAction, prefix: string = ASSIGNMENT_TYPES_REDUX_KEY): AssignmentTypesState {
    state = sharedReducer(state, action, new AssignmentTypesState(), ASSIGNMENT_TYPES_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AssignmentTypesState, AssignmentType, number>(state, action, prefix)
            };
    }
}
