import { Application, APPLICATIONS_REDUX_KEY, APPLICATIONS_AREA_KEY, APPLICATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgApplicationsRequests extends NgRecordRequests<Application, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, APPLICATIONS_REDUX_KEY, APPLICATIONS_ADDITIONAL_PATHS);
    }
}
