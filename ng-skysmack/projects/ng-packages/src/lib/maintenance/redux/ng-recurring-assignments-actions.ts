import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsActions extends RecordActionsBase<RecurringAssignmentsAppState, NgRedux<RecurringAssignmentsAppState>> {
    constructor(protected store: NgRedux<RecurringAssignmentsAppState>) { super(store, 'RECURRING_ASSIGNMENTS_', ['assignments', 'recurring']); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}
