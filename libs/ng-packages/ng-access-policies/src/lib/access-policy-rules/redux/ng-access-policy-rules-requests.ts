import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { AccessPolicyRule, ACCESS_POLICY_RULES_REDUX_KEY, ACCESS_POLICY_RULES_ADDITIONAL_PATHS } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesRequests extends NgRecordRequests<AccessPolicyRule, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, ACCESS_POLICY_RULES_REDUX_KEY, ACCESS_POLICY_RULES_ADDITIONAL_PATHS);
    }
}
