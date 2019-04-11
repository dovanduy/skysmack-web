import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Assignment, ASSIGNMENTS_REDUX_KEY } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgAssignmentsRequests } from './ng-assignments-requests';
import { NgAssignmentTypesActions } from '../../assignment-types/redux/ng-assignment-types-actions';
import { NgAssignmentTypesStore } from '../../assignment-types/redux/ng-assignment-types-store';
import { getCrudDependencies } from '@skysmack/ng-redux';
import { NgAssignmentsNotifications } from '../ng-assignments-notifications';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsEpics extends RecordEpicsBase<Assignment, number> {
    constructor(
        protected requests: NgAssignmentsRequests,
        protected notifications: NgAssignmentsNotifications,
        protected assignmentTypesActions: NgAssignmentTypesActions,
        protected assignmentTypesStore: NgAssignmentTypesStore
    ) {
        super(requests, ASSIGNMENTS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getCrudDependencies({
                prefix: ASSIGNMENTS_REDUX_KEY,
                relationIdSelector: 'assignmentTypeId',
                relationSelector: 'assignmentType',
                rsqlIdSelector: 'id',
                store: this.assignmentTypesStore,
                actions: this.assignmentTypesActions
            })
        ]);
    }
}