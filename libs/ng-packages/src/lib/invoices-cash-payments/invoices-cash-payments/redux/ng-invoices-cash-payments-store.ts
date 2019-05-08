import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InvoicesCashPayment, InvoicesCashPaymentsAppState } from '@skysmack/packages-invoices-cash-payments';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsStore extends NgRecordStore<InvoicesCashPaymentsAppState, InvoicesCashPayment, number> {
    constructor(protected ngRedux: NgRedux<InvoicesCashPaymentsAppState>) { super(ngRedux, 'invoicePayments'); }
}
