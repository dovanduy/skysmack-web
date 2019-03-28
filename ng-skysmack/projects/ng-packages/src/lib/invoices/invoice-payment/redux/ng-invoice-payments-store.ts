import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InvoicePayment, InvoicePaymentsAppState, INVOICE_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsStore extends NgRecordStore<InvoicePaymentsAppState, InvoicePayment, number> {
    constructor(protected ngRedux: NgRedux<InvoicePaymentsAppState>) { super(ngRedux, INVOICE_PAYMENTS_AREA_KEY); }
}
