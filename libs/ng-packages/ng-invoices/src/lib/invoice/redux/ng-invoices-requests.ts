import { Invoice, INVOICES_REDUX_KEY, INVOICES_ADDITIONAL_PATHS } from '@skysmack/packages-invoices';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicesRequests extends NgRecordRequests<Invoice, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, INVOICES_REDUX_KEY, INVOICES_ADDITIONAL_PATHS);
    }
}
