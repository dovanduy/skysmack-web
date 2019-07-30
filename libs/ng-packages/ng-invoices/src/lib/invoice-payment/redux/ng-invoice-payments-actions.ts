import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoicePaymentsAppState, InvoicePayment, INVOICE_PAYMENTS_REDUX_KEY, INVOICE_PAYMENTS_ADDITIONAL_PATHS } from '@skysmack/packages-invoices';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsActions extends RecordActionsBase<InvoicePaymentsAppState, NgRedux<InvoicePaymentsAppState>> {
    constructor(protected store: NgRedux<InvoicePaymentsAppState>) { super(store, INVOICE_PAYMENTS_REDUX_KEY, INVOICE_PAYMENTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<InvoicePayment, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
