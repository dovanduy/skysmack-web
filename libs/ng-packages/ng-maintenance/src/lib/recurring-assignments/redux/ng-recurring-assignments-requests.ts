import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { RecurringAssignment, ASSIGNMENTS_SCHEDULES_REDUX_KEY, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS } from '@skysmack/packages-maintenance';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsRequests extends NgRecordRequests<RecurringAssignment, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, ASSIGNMENTS_SCHEDULES_REDUX_KEY, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS);
    }
}
