import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { AccessPolicyRolesAppState } from './access-policy-roles-reducer';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { AccessPolicyRole } from '@skysmack/packages-skysmack-core';


export class AccessPolicyRolesActions extends RecordActionsBase<AccessPolicyRolesAppState, Store<AccessPolicyRolesAppState>> {
    constructor(protected store: Store<AccessPolicyRolesAppState>) { super(store, 'ACCESS_POLICY_ROLE_', ['access-policies', 'roles']); }

    protected getMessageParams(record: LocalObject<AccessPolicyRole, number>): StrIndex<string> {
        return {
            roleId: record.object.roleId
        };
    }
}
