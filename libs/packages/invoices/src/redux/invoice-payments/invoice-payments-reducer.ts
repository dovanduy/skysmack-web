import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { InvoicePayment } from '../../models/invoice-payment';
import { INVOICE_PAYMENTS_REDUX_KEY } from '../../constants';

/**
 * This is to be used when you want to access invoicePayments via the GLOBAL state. E.g. state.invoicePayments (where invoicePayments is the reducer name.)
 */
export class InvoicePaymentsAppState extends AppState {
    public invoicePayments: InvoicePaymentsState;
}

export class InvoicePaymentsState implements RecordState<InvoicePayment, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<InvoicePayment, number>>> = {};
}

export function invoicePaymentsReducer(state = new InvoicePaymentsState(), action: ReduxAction, prefix: string = INVOICE_PAYMENTS_REDUX_KEY): InvoicePaymentsState {
    state = sharedReducer(state, action, new InvoicePaymentsState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<InvoicePaymentsState, InvoicePayment, number>(state, action, prefix)
            };
    }
}
