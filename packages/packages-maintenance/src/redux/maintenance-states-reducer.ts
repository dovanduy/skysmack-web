import { LocalPage, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel, LocalPageTypes } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { MaintenanceState } from '../models/maintenance-state';

/**
 * This is to be used when you want to access maintenances via the GLOBAL state. E.g. state.maintenances (where maintenances is the reducer name.)
 */
export class MaintenanceStatesAppState extends AppState {
    public Maintenance: MaintenanceStateState;
}

export class MaintenanceStateState implements DocumentRecordState<MaintenanceState, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<MaintenanceState, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function maintenanceStateReducer(state = new MaintenanceStateState(), action: ReduxAction, prefix: string = 'MAINTENANCE_STATE_'): MaintenanceStateState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<MaintenanceStateState, MaintenanceState, number>(state, action, prefix)
            };
    }
}
