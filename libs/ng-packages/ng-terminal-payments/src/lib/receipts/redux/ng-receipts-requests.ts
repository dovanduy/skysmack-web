import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { Receipt, RECEIPTS_REDUX_KEY, RECEIPTS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgReceiptsRequests extends NgRecordRequests<Receipt, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, RECEIPTS_REDUX_KEY, RECEIPTS_ADDITIONAL_PATHS);
    }
}
