import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { AccessPolicyPermission } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsRequests extends NgRecordRequests<AccessPolicyPermission, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'ACCESS_POLICY_PERMISSIONS_', ['access-policies', 'permissions']);
    }
}
