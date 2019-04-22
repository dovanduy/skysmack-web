import { RecordEpicsBase } from '@skysmack/ng-redux';
import { RecurringAssignment, RECURRING_ASSIGNMENTS_REDUX_KEY } from '@skysmack/packages-maintenance';
import { NgRecurringAssignmentsRequests } from './ng-recurring-assignments-requests';
import { Injectable } from '@angular/core';
import { NgRecurringAssignmentsNotifications } from '../ng-recurring-assignments-notifications';
import { NgAssignmentTypesActions } from '../../assignment-types/redux/ng-assignment-types-actions';
import { NgAssignmentTypesStore } from '../../assignment-types/redux/ng-assignment-types-store';
import { getReadDependencies } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsEpics extends RecordEpicsBase<RecurringAssignment, number> {
    constructor(
        protected requests: NgRecurringAssignmentsRequests,
        protected notifications: NgRecurringAssignmentsNotifications,
        protected assignmentTypesStore: NgAssignmentTypesStore,
        protected assignmentTypesActions: NgAssignmentTypesActions,
        protected skysmackStore: NgSkysmackStore
        ) {
        super(requests, RECURRING_ASSIGNMENTS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: RECURRING_ASSIGNMENTS_REDUX_KEY,
                relationIdSelector: 'assignmentTypeId',
                relationSelector: 'assignmentType',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.assignmentTypesStore,
                actions: this.assignmentTypesActions
            })
        ]);
    }
}
