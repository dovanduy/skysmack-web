import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { MaintenanceState, MaintenanceStatesAppState } from '@skysmack/packages-maintenance';
import { NgRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesStore extends NgRecordReduxStore<MaintenanceStatesAppState, MaintenanceState, number> {
    constructor(protected ngRedux: NgRedux<MaintenanceStatesAppState>) { super(ngRedux, 'maintenanceStates'); }
}
