import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { InvoiceItem } from './../models/invoice-item';
import { sharedReducer } from '@skysmack/redux';

/**
 * This is to be used when you want to access invoices via the GLOBAL state. E.g. state.invoices (where invoices is the reducer name.)
 */
export class InvoiceItemsAppState extends AppState {
    public invoices: InvoiceItemsState;
}

export class InvoiceItemsState implements DocumentRecordState<InvoiceItem, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<InvoiceItem, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function invoiceItemsReducer(state = new InvoiceItemsState(), action: ReduxAction, prefix: string = 'INVOICE_ITEMS_'): InvoiceItemsState {
    state = sharedReducer(state, action, new InvoiceItemsState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<InvoiceItemsState, InvoiceItem, number>(state, action, prefix)
            };
    }
}
