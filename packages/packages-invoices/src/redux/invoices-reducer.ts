import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Invoice } from './../models/invoice';
import { sharedReducer } from '@skysmack/redux';
import { INVOICES_REDUX_KEY } from '../constants';

/**
 * This is to be used when you want to access invoices via the GLOBAL state. E.g. state.invoices (where invoices is the reducer name.)
 */
export class InvoicesAppState extends AppState {
    public invoices: InvoicesState;
}

export class InvoicesState implements RecordState<Invoice, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Invoice, number>>> = {};
}

export function invoicesReducer(state = new InvoicesState(), action: ReduxAction, prefix: string = INVOICES_REDUX_KEY): InvoicesState {
    state = sharedReducer(state, action, new InvoicesState());

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<InvoicesState, Invoice, number>(state, action, prefix)
            };
    }
}
