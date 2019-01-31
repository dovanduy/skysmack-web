import { InvoiceItem } from '@skysmack/packages-invoices';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocmentRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsRequests extends NgDocmentRecordRequests<InvoiceItem, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'INVOICE_ITEMS_', ['items']);
    }
}
