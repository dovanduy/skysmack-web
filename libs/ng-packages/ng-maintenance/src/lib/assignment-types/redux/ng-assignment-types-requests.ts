import { AssignmentType, ASSIGNMENT_TYPES_REDUX_KEY, ASSIGNMENT_TYPES_ADDITIONAL_PATHS } from '@skysmack/packages-maintenance';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesRequests extends NgRecordRequests<AssignmentType, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, ASSIGNMENT_TYPES_REDUX_KEY, ASSIGNMENT_TYPES_ADDITIONAL_PATHS);
    }
}
