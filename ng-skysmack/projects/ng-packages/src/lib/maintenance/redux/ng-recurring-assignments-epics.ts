import { RecordEpicsBase } from '@skysmack/ng-redux';
import { RecurringAssignment } from '@skysmack/packages-maintenance';
import { NgRecurringAssignmentsRequests } from './ng-recurring-assignments-requests';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsEpics extends RecordEpicsBase<RecurringAssignment, number> {
    constructor(protected requests: NgRecurringAssignmentsRequests) {
        super(requests, 'RECURRING_ASSIGNMENTS_');
    }
}