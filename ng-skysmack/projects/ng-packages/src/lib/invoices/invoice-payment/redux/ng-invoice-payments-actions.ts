import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoicePaymentsAppState } from '@skysmack/packages-invoices';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsActions extends DocumentRecordActionsBase<InvoicePaymentsAppState, NgRedux<InvoicePaymentsAppState>> {
    constructor(protected store: NgRedux<InvoicePaymentsAppState>) { super(store, 'INVOICE_PAYMENTS_', ['payments']); }
}
