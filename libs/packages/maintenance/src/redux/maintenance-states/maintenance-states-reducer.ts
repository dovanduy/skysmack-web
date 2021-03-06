import { StrIndex, LocalObject, LocalPageTypes } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase, sharedReducer } from '@skysmack/redux';
import { MaintenanceState } from '../../models/maintenance-state';
import { MAINTENANCE_STATES_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access maintenances via the GLOBAL state. E.g. state.maintenances (where maintenances is the reducer name.)
 */
export class MaintenanceStatesAppState extends AppState {
    public maintenanceStates: MaintenanceStateState;
}

export class MaintenanceStateState implements RecordState<MaintenanceState, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<MaintenanceState, number>>> = {};
}

export function maintenanceStatesReducer(state = new MaintenanceStateState(), action: ReduxAction, prefix: string = 'MAINTENANCE_STATES_'): MaintenanceStateState {
    state = sharedReducer(state, action, new MaintenanceStateState(), MAINTENANCE_STATES_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<MaintenanceStateState, MaintenanceState, number>(state, action, prefix)
            };
    }
}
