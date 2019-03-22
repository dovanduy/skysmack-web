import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Assignment } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgAssignmentsRequests } from './ng-assignments-requests';
import { NgAssignmentsNotifications } from '../ng-assignments-notifications';
import { NgAssignmentTypesActions } from './ng-assignment-types-actions';
import { NgAssignmentTypesStore } from './ng-assignment-types-store';
import { getCrudDependencies } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsEpics extends RecordEpicsBase<Assignment, number> {
    constructor(
        protected requests: NgAssignmentsRequests,
        protected notifications: NgAssignmentsNotifications,
        protected assignmentTypesActions: NgAssignmentTypesActions,
        protected assignmentTypesStore: NgAssignmentTypesStore
    ) {
        super(requests, 'ASSIGNMENTS_', notifications);
        this.epics = this.epics.concat([
            ...getCrudDependencies({
                prefix: 'ASSIGNMENTS_',
                relationIdSelector: 'assignmentTypeId',
                relationSelector: 'assignmentType',
                rsqlIdSelector: 'id',
                store: this.assignmentTypesStore,
                actions: this.assignmentTypesActions
            })
        ]);
    }
}
