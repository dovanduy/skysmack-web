import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Invoice } from './../models/invoice';
import { sharedReducer } from '@skysmack/redux';

/**
 * This is to be used when you want to access invoices via the GLOBAL state. E.g. state.invoices (where invoices is the reducer name.)
 */
export class InvoicesAppState extends AppState {
    public invoices: InvoicesState;
}

export class InvoicesState implements DocumentRecordState<Invoice, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Invoice, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function invoicesReducer(state = new InvoicesState(), action: ReduxAction, prefix: string = 'INVOICES_'): InvoicesState {
    state = sharedReducer(state, action, new InvoicesState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<InvoicesState, Invoice, number>(state, action, prefix)
            };
    }
}
