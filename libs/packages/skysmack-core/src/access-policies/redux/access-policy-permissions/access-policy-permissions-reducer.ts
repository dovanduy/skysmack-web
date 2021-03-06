import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { AccessPolicyPermission } from '../../models/access-policy-permission';
import { ACCESS_POLICY_PERMISSIONS_REDUX_KEY, ACCESS_POLICY_PERMISSIONS_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access accessPolicyPermissions via the GLOBAL state. E.g. state.accessPolicyPermissions (where accessPolicyPermissions is the reducer name.)
 */
export class AccessPolicyPermissionsAppState extends AppState {
    public accessPolicyPermissions: AccessPolicyPermissionsState;
}

export class AccessPolicyPermissionsState implements RecordState<AccessPolicyPermission, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AccessPolicyPermission, number>>> = {};
}

export function accessPolicyPermissionsReducer(state = new AccessPolicyPermissionsState(), action: ReduxAction, prefix: string = ACCESS_POLICY_PERMISSIONS_REDUX_KEY): AccessPolicyPermissionsState {
    state = sharedReducer(state, action, new AccessPolicyPermissionsState(), ACCESS_POLICY_PERMISSIONS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AccessPolicyPermissionsState, AccessPolicyPermission, number>(state, action, prefix)
            };
    }
}
