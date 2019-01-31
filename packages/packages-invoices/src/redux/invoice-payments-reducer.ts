import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { InvoicePayment } from '../models/invoice-payment';

/**
 * This is to be used when you want to access invoicePayments via the GLOBAL state. E.g. state.invoicePayments (where invoicePayments is the reducer name.)
 */
export class InvoicePaymentsAppState extends AppState {
    public invoicePayments: InvoicePaymentsState;
}

export class InvoicePaymentsState implements DocumentRecordState<InvoicePayment, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<InvoicePayment, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function invoicePaymentsReducer(state = new InvoicePaymentsState(), action: ReduxAction, prefix: string = 'INVOICE_PAYMENTS_'): InvoicePaymentsState {
    state = sharedReducer(state, action, new InvoicePaymentsState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<InvoicePaymentsState, InvoicePayment, number>(state, action, prefix)
            };
    }
}
