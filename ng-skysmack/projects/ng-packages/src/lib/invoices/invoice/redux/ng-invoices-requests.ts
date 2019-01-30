import { Invoice } from '@skysmack/packages-invoices';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocmentRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicesRequests extends NgDocmentRecordRequests<Invoice, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'INVOICES_', []);
    }
}
