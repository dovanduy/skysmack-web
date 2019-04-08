import { RecordEpicsBase } from '@skysmack/ng-redux';
import { RecurringAssignment, RECURRING_ASSIGNMENTS_REDUX_KEY } from '@skysmack/packages-maintenance';
import { NgRecurringAssignmentsRequests } from './ng-recurring-assignments-requests';
import { Injectable } from '@angular/core';
import { NgRecurringAssignmentsNotifications } from '../ng-recurring-assignments-notifications';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsEpics extends RecordEpicsBase<RecurringAssignment, number> {
    constructor(protected requests: NgRecurringAssignmentsRequests, protected notifications: NgRecurringAssignmentsNotifications) {
        super(requests, RECURRING_ASSIGNMENTS_REDUX_KEY, notifications);
    }
}