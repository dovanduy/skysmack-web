import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { AccessPolicyRole } from '../models/access-policy-role';

/**
 * This is to be used when you want to access accessPolicyRoles via the GLOBAL state. E.g. state.accessPolicyRoles (where accessPolicyRoles is the reducer name.)
 */
export class AccessPolicyRolesAppState extends AppState {
    public accessPolicyRoles: AccessPolicyRolesState;
}

export class AccessPolicyRolesState implements RecordState<AccessPolicyRole, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AccessPolicyRole, number>>> = {};
}

export function accessPolicyRolesReducer(state = new AccessPolicyRolesState(), action: ReduxAction, prefix: string = 'ACCESS_POLICY_ROLE_'): AccessPolicyRolesState {
    state = sharedReducer(state, action, new AccessPolicyRolesState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AccessPolicyRolesState, AccessPolicyRole, number>(state, action, prefix)
            };
    }
}
