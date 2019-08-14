import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { TerminalPaymentReceipt, TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY, TERMINAL_PAYMENT_RECEIPTS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsRequests extends NgRecordRequests<TerminalPaymentReceipt, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY, TERMINAL_PAYMENT_RECEIPTS_ADDITIONAL_PATHS);
    }
}
