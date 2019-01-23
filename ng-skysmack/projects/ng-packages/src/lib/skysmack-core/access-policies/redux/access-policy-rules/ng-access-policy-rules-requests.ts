import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { AccessPolicyRule } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesRequests extends NgRecordRequests<AccessPolicyRule, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'ACCESS_POLICY_RULES_', ['access-policies', 'rules']);
    }
}
