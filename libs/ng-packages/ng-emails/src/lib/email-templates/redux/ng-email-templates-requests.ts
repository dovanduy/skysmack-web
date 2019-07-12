import { EmailTemplate, EMAIL_TEMPLATES_REDUX_KEY, EMAIL_TEMPLATES_ADDITIONAL_PATHS } from '@skysmack/packages-emails';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgEmailTemplatesRequests extends NgRecordRequests<EmailTemplate, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, EMAIL_TEMPLATES_REDUX_KEY, EMAIL_TEMPLATES_ADDITIONAL_PATHS);
    }
}
