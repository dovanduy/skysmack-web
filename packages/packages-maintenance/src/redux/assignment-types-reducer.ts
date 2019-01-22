import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { AssignmentType } from '../models/assignment-type';

/**
 * This is to be used when you want to access assignmentsTypes via the GLOBAL state. E.g. state.assignmentsTypes (where assignmentsTypes is the reducer name.)
 */
export class AssignmentTypesAppState extends AppState {
    public AssignmentTypes: AssignmentTypesState;
}

export class AssignmentTypesState implements RecordState<AssignmentType, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AssignmentType, number>>> = {};
}

export function assignmentTypesReducer(state = new AssignmentTypesState(), action: ReduxAction, prefix: string = 'ASSIGMENT_TYPES_'): AssignmentTypesState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AssignmentTypesState, AssignmentType, number>(state, action, prefix)
            };
    }
}
