import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { AccessPolicyRolesAppState } from './access-policy-roles-reducer';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { AccessPolicyRole } from '../models/access-policy-role';
import { AccessPolicyRoleKey } from '../models/access-policy-role-key';


export class AccessPolicyRolesActions extends RecordActionsBase<AccessPolicyRolesAppState, Store<AccessPolicyRolesAppState>> {
    constructor(protected store: Store<AccessPolicyRolesAppState>) { super(store, 'ACCESS_POLICY_ROLE_', ['access-policies', 'roles']); }

    protected getMessageParams(record: LocalObject<AccessPolicyRole, AccessPolicyRoleKey>): StrIndex<string> {
        return {
            roleId: 'AccessPolicyRole'
        };
    }
}
