import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { InvoicesCashPaymentsAppState, CashPayment } from '@skysmack/packages-invoices-cash-payments';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsStore extends NgRecordStore<InvoicesCashPaymentsAppState, CashPayment, number> {
    constructor(
        protected ngRedux: NgRedux<InvoicesCashPaymentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'invoicesCashPayments'); }
}
