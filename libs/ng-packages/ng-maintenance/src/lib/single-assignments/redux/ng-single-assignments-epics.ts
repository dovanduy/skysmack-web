import { RecordEpicsBase } from '@skysmack/ng-framework';
import { SingleAssignment, SINGLE_ASSIGNMENTS_REDUX_KEY } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgSingleAssignmentsRequests } from './ng-single-assignments-requests';
import { getReadDependencies } from '@skysmack/ng-framework';
import { NgSingleAssignmentsNotifications } from '../ng-single-assignments-notifications';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgAssignmentTypesActions } from '../../assignment-types/redux/ng-assignment-types-actions';
import { NgAssignmentTypesStore } from '../../assignment-types/redux/ng-assignment-types-store';

@Injectable({ providedIn: 'root' })
export class NgSingleAssignmentsEpics extends RecordEpicsBase<SingleAssignment, number> {
    constructor(
        protected requests: NgSingleAssignmentsRequests,
        protected notifications: NgSingleAssignmentsNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected assignmentTypesActions: NgAssignmentTypesActions,
        protected assignmentTypesStore: NgAssignmentTypesStore
    ) {
        super(requests, SINGLE_ASSIGNMENTS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: SINGLE_ASSIGNMENTS_REDUX_KEY,
                relationIdSelector: 'assignmentTypeId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.assignmentTypesStore,
                actions: this.assignmentTypesActions
            })
        ]);
    }
}
