import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { InvoiceItem } from '../../models/invoice-item';
import { sharedReducer } from '@skysmack/redux';
import { INVOICE_ITEMS_REDUX_KEY } from '../../constants';

/**
 * This is to be used when you want to access invoiceItems via the GLOBAL state. E.g. state.invoiceItems (where invoiceItems is the reducer name.)
 */
export class InvoiceItemsAppState extends AppState {
    public invoiceItems: InvoiceItemsState;
}

export class InvoiceItemsState implements RecordState<InvoiceItem, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<InvoiceItem, number>>> = {};
}

export function invoiceItemsReducer(state = new InvoiceItemsState(), action: ReduxAction, prefix: string = INVOICE_ITEMS_REDUX_KEY): InvoiceItemsState {
    state = sharedReducer(state, action, new InvoiceItemsState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<InvoiceItemsState, InvoiceItem, number>(state, action, prefix)
            };
    }
}
