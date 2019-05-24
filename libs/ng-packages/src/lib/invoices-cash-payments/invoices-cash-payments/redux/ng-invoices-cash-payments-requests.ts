import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { INVOICES_CASH_PAYMENTS_REDUX_KEY, INVOICES_CASH_PAYMENTS_ADDITIONAL_PATHS, CashPayment } from '@skysmack/packages-invoices-cash-payments';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsRequests extends NgRecordRequests<CashPayment, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, INVOICES_CASH_PAYMENTS_REDUX_KEY, INVOICES_CASH_PAYMENTS_ADDITIONAL_PATHS);
    }
}
