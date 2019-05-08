import { InvoicesCashPayment, INVOICE_PAYMENTS_REDUX_KEY, INVOICE_PAYMENTS_ADDITIONAL_PATHS } from '@skysmack/packages-invoices-cash-payments';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsRequests extends NgRecordRequests<InvoicesCashPayment, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, INVOICE_PAYMENTS_REDUX_KEY, INVOICE_PAYMENTS_ADDITIONAL_PATHS);
    }
}
