import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { AccessPolicyRule } from '../models/access-policy-rule';
import { ACCESS_POLICY_RULES_REDUX_KEY } from '../constants';

/**
 * This is to be used when you want to access accessPolicyRules via the GLOBAL state. E.g. state.accessPolicyRules (where accessPolicyRules is the reducer name.)
 */
export class AccessPolicyRulesAppState extends AppState {
    public accessPolicyRules: AccessPolicyRulesState;
}

export class AccessPolicyRulesState implements RecordState<AccessPolicyRule, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<AccessPolicyRule, number>>> = {};
}

export function accessPolicyRulesReducer(state = new AccessPolicyRulesState(), action: ReduxAction, prefix: string = ACCESS_POLICY_RULES_REDUX_KEY): AccessPolicyRulesState {
    state = sharedReducer(state, action, new AccessPolicyRulesState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<AccessPolicyRulesState, AccessPolicyRule, number>(state, action, prefix)
            };
    }
}
