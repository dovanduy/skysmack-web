import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Role } from './../models/role';

/**
 * This is to be used when you want to access roles via the GLOBAL state. E.g. state.roles (where roles is the reducer name.)
 */
export class RolesAppState extends AppState {
    public roles: RolesState;
}

export class RolesState implements RecordState<Role, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Role, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function rolesReducer(state = new RolesState(), action: ReduxAction, prefix: string = 'ROLES_'): RolesState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<RolesState, Role, number>(state, action, prefix)
            };
    }
}
