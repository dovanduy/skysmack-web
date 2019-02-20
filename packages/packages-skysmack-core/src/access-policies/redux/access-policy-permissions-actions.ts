import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { AccessPolicyPermissionsAppState } from './access-policy-permissions-reducer';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { AccessPolicyPermission } from '../models/access-policy-permission';


export class AccessPolicyPermissionsActions extends RecordActionsBase<AccessPolicyPermissionsAppState, Store<AccessPolicyPermissionsAppState>> {
    constructor(protected store: Store<AccessPolicyPermissionsAppState>) { super(store, 'ACCESS_POLICY_PERMISSIONS_', ['access-policies', 'permissions']); }

    protected getMessageParams(record: LocalObject<AccessPolicyPermission, number>): StrIndex<string> {
        return {
            ruleId: record.object.ruleId.toString()
        };
    }
}
