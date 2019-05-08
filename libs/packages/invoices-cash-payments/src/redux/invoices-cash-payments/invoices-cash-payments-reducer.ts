import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { CashPayment } from '../../models/cash-payment';
import { INVOICES_CASH_PAYMENTS_REDUX_KEY } from '@skysmack/packages/invoices-cash-payments';

/**
 * This is to be used when you want to access invoicesCashPayments via the GLOBAL state. E.g. state.invoicesCashPayments (where invoicesCashPayments is the reducer name.)
 */
export class InvoicesCashPaymentsAppState extends AppState {
    public invoicesCashPayments: InvoicesCashPaymentsState;
}

export class InvoicesCashPaymentsState implements RecordState<CashPayment, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<CashPayment, number>>> = {};
}

export function invoicesCashPaymentsReducer(state = new InvoicesCashPaymentsState(), action: ReduxAction, prefix: string = INVOICES_CASH_PAYMENTS_REDUX_KEY): InvoicesCashPaymentsState {
    state = sharedReducer(state, action, new InvoicesCashPaymentsState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<InvoicesCashPaymentsState, CashPayment, number>(state, action, prefix)
            };
    }
}
