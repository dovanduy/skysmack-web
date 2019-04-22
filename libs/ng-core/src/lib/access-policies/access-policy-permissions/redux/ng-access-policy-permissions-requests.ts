import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { AccessPolicyPermission, ACCESS_POLICY_PERMISSIONS_REDUX_KEY, ACCESS_POLICY_PERMISSIONS_ADDITIONAL_PATHS } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsRequests extends NgRecordRequests<AccessPolicyPermission, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, ACCESS_POLICY_PERMISSIONS_REDUX_KEY, ACCESS_POLICY_PERMISSIONS_ADDITIONAL_PATHS);
    }
}
