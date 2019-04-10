import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MaintenanceStatesAppState, MaintenanceState, MAINTENANCE_STATES_ADDITIONAL_PATHS, MAINTENANCE_STATES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesActions extends RecordActionsBase<MaintenanceStatesAppState, NgRedux<MaintenanceStatesAppState>> {
    constructor(protected store: NgRedux<MaintenanceStatesAppState>) { super(store, MAINTENANCE_STATES_REDUX_KEY, MAINTENANCE_STATES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<MaintenanceState, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
