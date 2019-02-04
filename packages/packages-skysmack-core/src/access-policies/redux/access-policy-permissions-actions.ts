import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { AccessPolicyPermissionsAppState } from './access-policy-permissions-reducer';
import { LocalObject, NumIndex } from '@skysmack/framework';

export class AccessPolicyPermissionsActions extends RecordActionsBase<AccessPolicyPermissionsAppState, Store<AccessPolicyPermissionsAppState>> {
    constructor(protected store: Store<AccessPolicyPermissionsAppState>) { super(store, 'ACCESS_POLICY_PERMISSIONS_', ['access-policies', 'permissions']); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}
