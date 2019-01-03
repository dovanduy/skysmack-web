import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsActions extends RecordActionsBase<RecurringAssignmentsAppState, NgRedux<RecurringAssignmentsAppState>> {
    constructor(protected store: NgRedux<RecurringAssignmentsAppState>) { super(store, 'RECURRING_ASSIGNMENTS_', ['types']); }
}
