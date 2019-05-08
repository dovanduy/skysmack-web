import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoicesCashPaymentsAppState, InvoicesCashPayment, INVOICE_PAYMENTS_REDUX_KEY, INVOICE_PAYMENTS_ADDITIONAL_PATHS } from '@skysmack/packages-invoices-cash-payments';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsActions extends RecordActionsBase<InvoicesCashPaymentsAppState, NgRedux<InvoicesCashPaymentsAppState>> {
    constructor(protected store: NgRedux<InvoicesCashPaymentsAppState>) { super(store, INVOICE_PAYMENTS_REDUX_KEY, INVOICE_PAYMENTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<InvoicesCashPayment, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
