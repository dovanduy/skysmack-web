import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgAccessPolicyRulesRequests } from './ng-access-policy-rules-requests';
import { AccessPolicyRule } from '@skysmack/packages-skysmack-core';


@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesEpics extends RecordEpicsBase<AccessPolicyRule, number> {
    constructor(protected requests: NgAccessPolicyRulesRequests) {
        super(requests, 'ACCESS_POLICY_RULES_');
    }
}
