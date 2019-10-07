import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RecurringAssignmentsAppState, RecurringAssignment, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS, ASSIGNMENTS_SCHEDULES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsActions extends RecordActionsBase<RecurringAssignmentsAppState, NgRedux<RecurringAssignmentsAppState>> {
    constructor(protected store: NgRedux<RecurringAssignmentsAppState>) { super(store, ASSIGNMENTS_SCHEDULES_REDUX_KEY, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<RecurringAssignment, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
