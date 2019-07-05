import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { MaintenanceState, MaintenanceStatesAppState, MAINTENANCE_STATES_REDUCER_KEY } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesStore extends NgRecordStore<MaintenanceStatesAppState, MaintenanceState, number> {
    constructor(
        protected ngRedux: NgRedux<MaintenanceStatesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, MAINTENANCE_STATES_REDUCER_KEY); }
}
