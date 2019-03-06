import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { MaintenanceState, MaintenanceStatesAppState } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesStore extends NgRecordStore<MaintenanceStatesAppState, MaintenanceState, number> {
    constructor(protected ngRedux: NgRedux<MaintenanceStatesAppState>) { super(ngRedux, 'maintenanceStates'); }
}
