import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { InvoicesCashPaymentsAppState, CashPayment } from '@skysmack/packages-invoices-cash-payments';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsStore extends NgRecordStore<InvoicesCashPaymentsAppState, CashPayment, number> {
    constructor(protected ngRedux: NgRedux<InvoicesCashPaymentsAppState>) { super(ngRedux, 'invoicePayments'); }
}
