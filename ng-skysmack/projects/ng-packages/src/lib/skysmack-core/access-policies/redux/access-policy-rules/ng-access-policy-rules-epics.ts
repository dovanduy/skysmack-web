import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgAccessPolicyRulesRequests } from './ng-access-policy-rules-requests';
import { AccessPolicyRule, ACCESS_POLICY_RULES_REDUX_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRulesNotifications } from '../../ng-access-policy-rules-notifications';


@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesEpics extends RecordEpicsBase<AccessPolicyRule, number> {
    constructor(protected requests: NgAccessPolicyRulesRequests, protected notifications: NgAccessPolicyRulesNotifications) {
        super(requests, ACCESS_POLICY_RULES_REDUX_KEY, notifications);
    }
}
