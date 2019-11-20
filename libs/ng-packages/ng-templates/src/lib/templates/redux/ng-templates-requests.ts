import { Template, TEMPLATES_REDUX_KEY, TEMPLATES_ADDITIONAL_PATHS } from '@skysmack/packages-templates';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgTemplatesRequests extends NgRecordRequests<Template, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, TEMPLATES_REDUX_KEY, TEMPLATES_ADDITIONAL_PATHS);
    }
}
