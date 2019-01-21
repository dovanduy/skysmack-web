import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocmentRecordRequests } from '@skysmack/ng-redux';
import { Receipt } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgReceiptsRequests extends NgDocmentRecordRequests<Receipt, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'RECEIPTS_', ['receipts']);
    }
}
