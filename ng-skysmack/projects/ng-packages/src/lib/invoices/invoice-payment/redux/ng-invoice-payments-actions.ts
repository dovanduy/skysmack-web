import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoicePaymentsAppState, InvoicePayment } from '@skysmack/packages-invoices';
import { NumIndex, LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsActions extends DocumentRecordActionsBase<InvoicePaymentsAppState, NgRedux<InvoicePaymentsAppState>> {
    constructor(protected store: NgRedux<InvoicePaymentsAppState>) { super(store, 'INVOICE_PAYMENTS_', ['payments']); }

    protected getMessageParams(record: LocalObject<InvoicePayment, number>): NumIndex<string> {
        return {
            0: record.object.description
        };
    }
}
