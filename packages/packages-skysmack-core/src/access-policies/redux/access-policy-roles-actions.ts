import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { AccessPolicyRolesAppState } from './access-policy-roles-reducer';

export class AccessPolicyRolesActions extends RecordActionsBase<AccessPolicyRolesAppState, Store<AccessPolicyRolesAppState>> {
    constructor(protected store: Store<AccessPolicyRolesAppState>) { super(store, 'ACCESS_POLICY_ROLE_', ['access-policies', 'roles']); }
}
