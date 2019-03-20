import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Assignment, ASSIGNMENTS_REDUX_KEY } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgAssignmentsRequests } from './ng-assignments-requests';
import { NgAssignmentsNotifications } from '../ng-assignments-notifications';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsEpics extends RecordEpicsBase<Assignment, number> {
    constructor(protected requests: NgAssignmentsRequests, protected notifications: NgAssignmentsNotifications) {
        super(requests, ASSIGNMENTS_REDUX_KEY, notifications);
    }
}
