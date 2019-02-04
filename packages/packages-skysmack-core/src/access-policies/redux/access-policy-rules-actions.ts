import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { AccessPolicyRulesAppState } from './access-policy-rules-reducer';
import { LocalObject, NumIndex } from '@skysmack/framework';

export class AccessPolicyRulesActions extends RecordActionsBase<AccessPolicyRulesAppState, Store<AccessPolicyRulesAppState>> {
    constructor(protected store: Store<AccessPolicyRulesAppState>) { super(store, 'ACCESS_POLICY_RULES_', ['access-policies', 'rules']); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}
