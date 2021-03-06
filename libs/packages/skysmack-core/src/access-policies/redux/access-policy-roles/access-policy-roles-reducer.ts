import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { AccessPolicyRole } from '../../models/access-policy-role';
import { AccessPolicyRoleKey } from '../../models/access-policy-role-key';
import { ACCESS_POLICY_ROLES_REDUX_KEY, ACCESS_POLICY_ROLES_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access accessPolicyRoles via the GLOBAL state. E.g. state.accessPolicyRoles (where accessPolicyRoles is the reducer name.)
 */
export class AccessPolicyRolesAppState extends AppState {
    public accessPolicyRoles: AccessPolicyRolesState;
}

export class AccessPolicyRolesState implements RecordState<AccessPolicyRole, AccessPolicyRoleKey> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<AccessPolicyRoleKey>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AccessPolicyRole, AccessPolicyRoleKey>>> = {};
}

export function accessPolicyRolesReducer(state = new AccessPolicyRolesState(), action: ReduxAction, prefix: string = ACCESS_POLICY_ROLES_REDUX_KEY): AccessPolicyRolesState {
    state = sharedReducer(state, action, new AccessPolicyRolesState(), ACCESS_POLICY_ROLES_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AccessPolicyRolesState, AccessPolicyRole, AccessPolicyRoleKey>(state, action, prefix)
            };
    }
}
