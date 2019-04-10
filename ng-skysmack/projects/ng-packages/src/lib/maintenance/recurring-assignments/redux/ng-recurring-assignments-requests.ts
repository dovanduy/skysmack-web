import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { RecurringAssignment, RECURRING_ASSIGNMENTS_REDUX_KEY, RECURRING_ASSIGNMENTS_ADDITIONAL_PATHS } from '@skysmack/packages-maintenance';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsRequests extends NgRecordRequests<RecurringAssignment, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, RECURRING_ASSIGNMENTS_REDUX_KEY, RECURRING_ASSIGNMENTS_ADDITIONAL_PATHS);
    }
}
