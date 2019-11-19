import { Webhook, WEBHOOKS_REDUX_KEY, WEBHOOKS_ADDITIONAL_PATHS } from '@skysmack/packages-webhooks';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgWebhooksRequests extends NgRecordRequests<Webhook, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, WEBHOOKS_REDUX_KEY, WEBHOOKS_ADDITIONAL_PATHS);
    }
}
