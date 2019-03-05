import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MaintenanceStatesAppState, MaintenanceState } from '@skysmack/packages-maintenance';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesActions extends RecordActionsBase<MaintenanceStatesAppState, NgRedux<MaintenanceStatesAppState>> {
    constructor(protected store: NgRedux<MaintenanceStatesAppState>) { super(store, 'MAINTENANCE_STATES_', []); }

    public getMessageParams(record: LocalObject<MaintenanceState, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
