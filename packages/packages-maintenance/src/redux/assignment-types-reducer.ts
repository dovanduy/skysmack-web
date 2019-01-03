import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { AssignmentType } from '../models/assignment-type';

/**
 * This is to be used when you want to access assignmentsTypes via the GLOBAL state. E.g. state.assignmentsTypes (where assignmentsTypes is the reducer name.)
 */
export class AssignmentTypesAppState extends AppState {
    public AssignmentTypes: AssignmentTypesState;
}

export class AssignmentTypesState implements DocumentRecordState<AssignmentType, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AssignmentType, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function assignmentTypesReducer(state = new AssignmentTypesState(), action: ReduxAction, prefix: string = 'ASSIGMENT_TYPES_'): AssignmentTypesState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<AssignmentTypesState, AssignmentType, number>(state, action, prefix)
            };
    }
}
