import { LocalPage, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel, LocalPageTypes } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { RecurringAssignment } from '../models/recurring-assignment';

/**
 * This is to be used when you want to access maintenances via the GLOBAL state. E.g. state.maintenances (where maintenances is the reducer name.)
 */
export class RecurringAssignmentsAppState extends AppState {
    public Maintenance: RecurringAssignmentState;
}

export class RecurringAssignmentState implements DocumentRecordState<RecurringAssignment, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<RecurringAssignment, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function recurringAssignmentReducer(state = new RecurringAssignmentState(), action: ReduxAction, prefix: string = 'RECURRING_ASSIGNMENT_'): RecurringAssignmentState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<RecurringAssignmentState, RecurringAssignment, number>(state, action, prefix)
            };
    }
}
