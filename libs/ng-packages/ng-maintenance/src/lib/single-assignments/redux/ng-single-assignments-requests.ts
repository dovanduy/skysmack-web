import { SingleAssignment, SINGLE_ASSIGNMENTS_REDUX_KEY, SINGLE_ASSIGNMENTS_ADDITIONAL_PATHS } from '@skysmack/packages-maintenance';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgSingleAssignmentsRequests extends NgRecordRequests<SingleAssignment, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, SINGLE_ASSIGNMENTS_REDUX_KEY, SINGLE_ASSIGNMENTS_ADDITIONAL_PATHS);
    }
}
