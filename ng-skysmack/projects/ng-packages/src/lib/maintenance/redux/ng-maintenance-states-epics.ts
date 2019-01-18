import { RecordEpicsBase } from '@skysmack/ng-redux';
import { MaintenanceState } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgMaintenanceStatesRequests } from './ng-maintenance-states-requests';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesEpics extends RecordEpicsBase<MaintenanceState, number> {
    constructor(protected requests: NgMaintenanceStatesRequests) {
        super(requests, 'MAINTENANCE_STATE_');
    }
}