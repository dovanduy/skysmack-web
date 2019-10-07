import { RecordEpicsBase } from '@skysmack/ng-framework';
import { AssignmentsSchedule, ASSIGNMENTS_SCHEDULES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { NgAssignmentsSchedulesRequests } from './ng-assignments-schedules-requests';
import { Injectable } from '@angular/core';
import { NgAssignmentsSchedulesNotifications } from '../ng-assignments-schedules-notifications';
import { NgAssignmentTypesActions } from '../../assignment-types/redux/ng-assignment-types-actions';
import { NgAssignmentTypesStore } from '../../assignment-types/redux/ng-assignment-types-store';
import { getReadDependencies } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsSchedulesEpics extends RecordEpicsBase<AssignmentsSchedule, number> {
    constructor(
        protected requests: NgAssignmentsSchedulesRequests,
        protected notifications: NgAssignmentsSchedulesNotifications,
        protected assignmentTypesStore: NgAssignmentTypesStore,
        protected assignmentTypesActions: NgAssignmentTypesActions,
        protected skysmackStore: NgSkysmackStore
    ) {
        super(requests, ASSIGNMENTS_SCHEDULES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: ASSIGNMENTS_SCHEDULES_REDUX_KEY,
                relationIdSelector: 'assignmentTypeId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.assignmentTypesStore,
                actions: this.assignmentTypesActions
            })
        ]);
    }
}
