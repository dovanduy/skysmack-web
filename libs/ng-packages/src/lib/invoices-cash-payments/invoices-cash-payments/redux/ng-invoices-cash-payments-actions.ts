import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { INVOICES_CASH_PAYMENTS_REDUX_KEY, INVOICES_CASH_PAYMENTS_ADDITIONAL_PATHS, CashPayment, InvoicesCashPaymentsAppState } from '@skysmack/packages-invoices-cash-payments';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsActions extends RecordActionsBase<InvoicesCashPaymentsAppState, NgRedux<InvoicesCashPaymentsAppState>> {
    constructor(protected store: NgRedux<InvoicesCashPaymentsAppState>) { super(store, INVOICES_CASH_PAYMENTS_REDUX_KEY, INVOICES_CASH_PAYMENTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<CashPayment, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
