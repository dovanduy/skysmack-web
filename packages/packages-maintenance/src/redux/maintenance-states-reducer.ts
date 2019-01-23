import { StrIndex, LocalObject, LocalPageTypes } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase, sharedReducer } from '@skysmack/redux';
import { MaintenanceState } from '../models/maintenance-state';

/**
 * This is to be used when you want to access maintenances via the GLOBAL state. E.g. state.maintenances (where maintenances is the reducer name.)
 */
export class MaintenanceStatesAppState extends AppState {
    public Maintenance: MaintenanceStateState;
}

export class MaintenanceStateState implements RecordState<MaintenanceState, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<MaintenanceState, number>>> = {};
}

export function maintenanceStateReducer(state = new MaintenanceStateState(), action: ReduxAction, prefix: string = 'MAINTENANCE_STATE_'): MaintenanceStateState {
    state = sharedReducer(state, action, new MaintenanceStateState());
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<MaintenanceStateState, MaintenanceState, number>(state, action, prefix)
            };
    }
}
