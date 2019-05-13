import { NgAssignmentTypesRequests } from './ng-assignment-types-requests';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-redux';
import { AssignmentType, ASSIGNMENT_TYPES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgAssignmentTypesNotifications } from '../ng-assignment-types-notifications';
import { NgMaintenanceStatesStore, NgMaintenanceStatesActions } from '../../maintenance-states';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesEpics extends RecordEpicsBase<AssignmentType, number> {
    constructor(
        protected requests: NgAssignmentTypesRequests,
        protected notifications: NgAssignmentTypesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected maintenanceStatesStore: NgMaintenanceStatesStore,
        protected maintenanceStatesActions: NgMaintenanceStatesActions
    ) {
        super(requests, ASSIGNMENT_TYPES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: ASSIGNMENT_TYPES_REDUX_KEY,
                relationIdSelector: 'stateId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.maintenanceStatesStore,
                actions: this.maintenanceStatesActions
            })
        ]);
    }
}