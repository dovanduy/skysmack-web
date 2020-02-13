import { Definition, DEFINITIONS_REDUX_KEY, DEFINITIONS_ADDITIONAL_PATHS } from '@skysmack/packages-workflows';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgDefinitionsRequests extends NgRecordRequests<Definition, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, DEFINITIONS_REDUX_KEY, DEFINITIONS_ADDITIONAL_PATHS);
    }
}
