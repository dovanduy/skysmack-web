import { Workflow, WORKFLOWS_REDUX_KEY, WORKFLOWS_ADDITIONAL_PATHS } from '@skysmack/packages-workflows';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgWorkflowsRequests extends NgRecordRequests<Workflow, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, WORKFLOWS_REDUX_KEY, WORKFLOWS_ADDITIONAL_PATHS);
    }
}
