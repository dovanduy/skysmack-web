import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { AccessPolicyRulesAppState } from './access-policy-rules-reducer';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { AccessPolicyRule } from '../models/access-policy-rule';


export class AccessPolicyRulesActions extends RecordActionsBase<AccessPolicyRulesAppState, Store<AccessPolicyRulesAppState>> {
    constructor(protected store: Store<AccessPolicyRulesAppState>) { super(store, 'ACCESS_POLICY_RULES_', ['access-policies', 'rules']); }

    protected getMessageParams(record: LocalObject<AccessPolicyRule, number>): StrIndex<string> {
        return {
            id: record.object.id.toString()
        };
    }
}
