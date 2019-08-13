import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RecurringAssignmentsAppState, RecurringAssignment, RECURRING_ASSIGNMENTS_ADDITIONAL_PATHS, RECURRING_ASSIGNMENTS_REDUX_KEY, AssignmentType } from '@skysmack/packages-maintenance';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsActions extends RecordActionsBase<RecurringAssignmentsAppState, NgRedux<RecurringAssignmentsAppState>> {
    constructor(protected store: NgRedux<RecurringAssignmentsAppState>) { super(store, RECURRING_ASSIGNMENTS_REDUX_KEY, RECURRING_ASSIGNMENTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<RecurringAssignment, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
