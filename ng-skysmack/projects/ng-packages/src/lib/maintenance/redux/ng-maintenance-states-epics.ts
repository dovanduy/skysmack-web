import { RecordEpicsBase } from '@skysmack/ng-redux';
import { MaintenanceState, MAINTENANCE_STATES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgMaintenanceStatesRequests } from './ng-maintenance-states-requests';
import { NgMaintenanceStatesNotifications } from '../ng-maintenance-states-notifications';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesEpics extends RecordEpicsBase<MaintenanceState, number> {
    constructor(protected requests: NgMaintenanceStatesRequests, protected notifications: NgMaintenanceStatesNotifications) {
        super(requests, MAINTENANCE_STATES_REDUX_KEY, notifications);
    }
}