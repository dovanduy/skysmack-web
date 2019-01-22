import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiDomain } from '@skysmack/framework';
import { RecurringAssignment } from '@skysmack/packages-maintenance';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsRequests extends NgRecordRequests<RecurringAssignment, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'RECURRING_ASSIGNMENTS_', ['assignments', 'recurring']);
    }
}
