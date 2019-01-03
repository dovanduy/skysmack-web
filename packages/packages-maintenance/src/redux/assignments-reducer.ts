import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Assignment } from './../models/assignment';

/**
 * This is to be used when you want to access assignment via the GLOBAL state. E.g. state.assignment (where assignment is the reducer name.)
 */
export class AssignmentsAppState extends AppState {
    public Assignment: AssignmentsState;
}

export class AssignmentsState implements DocumentRecordState<Assignment, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Assignment, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function assignmentReducer(state = new AssignmentsState(), action: ReduxAction, prefix: string = 'ASSIGNMENTS_'): AssignmentsState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<AssignmentsState, Assignment, number>(state, action, prefix)
            };
    }
}
