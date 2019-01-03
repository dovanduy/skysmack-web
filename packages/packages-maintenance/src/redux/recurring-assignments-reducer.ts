import { StrIndex, LocalObject, LocalPageTypes } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { RecurringAssignment } from '../models/recurring-assignment';

/**
 * This is to be used when you want to access maintenances via the GLOBAL state. E.g. state.maintenances (where maintenances is the reducer name.)
 */
export class RecurringAssignmentsAppState extends AppState {
    public Maintenance: RecurringAssignmentState;
}

export class RecurringAssignmentState implements RecordState<RecurringAssignment, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<RecurringAssignment, number>>> = {};
}

export function recurringAssignmentReducer(state = new RecurringAssignmentState(), action: ReduxAction, prefix: string = 'RECURRING_ASSIGNMENT_'): RecurringAssignmentState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<RecurringAssignmentState, RecurringAssignment, number>(state, action, prefix)
            };
    }
}
