import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InvoicePayment, InvoicePaymentsAppState, INVOICE_PAYMENTS_REDUCER_KEY } from '@skysmack/packages-invoices';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsStore extends NgRecordStore<InvoicePaymentsAppState, InvoicePayment, number> {
    constructor(
        protected ngRedux: NgRedux<InvoicePaymentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, INVOICE_PAYMENTS_REDUCER_KEY); }
}
