import { Role, ROLES_REDUX_KEY, ROLES_AREA_KEY, ROLES_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgRolesRequests extends NgRecordRequests<Role, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, ROLES_REDUX_KEY, ROLES_ADDITIONAL_PATHS);
    }
}
