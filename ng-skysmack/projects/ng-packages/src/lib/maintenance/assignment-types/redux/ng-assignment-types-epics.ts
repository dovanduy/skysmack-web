import { NgAssignmentTypesRequests } from './ng-assignment-types-requests';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { AssignmentType, ASSIGNMENT_TYPES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgAssignmentTypesNotifications } from '../ng-assignment-types-notifications';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesEpics extends RecordEpicsBase<AssignmentType, number> {
    constructor(protected requests: NgAssignmentTypesRequests, protected notifications: NgAssignmentTypesNotifications) {
        super(requests, ASSIGNMENT_TYPES_REDUX_KEY, notifications);
    }
}