import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InvoicePayment, InvoicePaymentsAppState } from '@skysmack/packages-invoices';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsStore extends NgDocumentRecordReduxStore<InvoicePaymentsAppState, InvoicePayment, number> {
    constructor(protected ngRedux: NgRedux<InvoicePaymentsAppState>) { super(ngRedux, 'invoicePayments'); }
}
