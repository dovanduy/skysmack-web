import { RecordActionsBase, DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MaintenanceStatesAppState } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesActions extends DocumentRecordActionsBase<MaintenanceStatesAppState, NgRedux<MaintenanceStatesAppState>> {
    constructor(protected store: NgRedux<MaintenanceStatesAppState>) { super(store, 'MAINTENANCE_STATES_', []); }
}