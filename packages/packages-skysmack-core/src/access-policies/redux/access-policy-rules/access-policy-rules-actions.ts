import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { AccessPolicyRulesAppState } from './access-policy-rules-reducer';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { AccessPolicyRule } from '../../models/access-policy-rule';
import { ACCESS_POLICY_RULES_ADDITIONAL_PATHS, ACCESS_POLICY_RULES_REDUX_KEY } from '../../constants';


export class AccessPolicyRulesActions extends RecordActionsBase<AccessPolicyRulesAppState, Store<AccessPolicyRulesAppState>> {
    constructor(protected store: Store<AccessPolicyRulesAppState>) { super(store, ACCESS_POLICY_RULES_REDUX_KEY, ACCESS_POLICY_RULES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<AccessPolicyRule, number>): StrIndex<string> {
        return {
            id: 'Object'
        };
    }
}
