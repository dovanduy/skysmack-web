import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MaintenanceStatesAppState } from '@skysmack/packages-maintenance';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesActions extends RecordActionsBase<MaintenanceStatesAppState, NgRedux<MaintenanceStatesAppState>> {
    constructor(protected store: NgRedux<MaintenanceStatesAppState>) { super(store, 'MAINTENANCE_STATES_', []); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}
