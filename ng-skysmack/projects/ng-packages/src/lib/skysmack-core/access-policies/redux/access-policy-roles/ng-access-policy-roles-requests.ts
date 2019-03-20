import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { ROLES_AREA_KEY } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesRequests extends NgRecordRequests<AccessPolicyRole, AccessPolicyRoleKey> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'ACCESS_POLICY_ROLES_', ['access-policies', ROLES_AREA_KEY]);
    }
}
