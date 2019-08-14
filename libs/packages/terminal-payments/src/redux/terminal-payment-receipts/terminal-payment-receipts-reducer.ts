import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { TerminalPaymentReceipt } from '../../models/terminal-payment-receipt';
import { TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access terminalPaymentReceipts via the GLOBAL state. E.g. state.terminalPaymentReceipts (where terminalPaymentReceipts is the reducer name.)
 */
export class TerminalPaymentReceiptsAppState extends AppState {
    public terminalPaymentReceipts: TerminalPaymentReceiptsState;
}

export class TerminalPaymentReceiptsState implements RecordState<TerminalPaymentReceipt, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<TerminalPaymentReceipt, number>>> = {};
}

export function terminalPaymentReceiptsReducer(state = new TerminalPaymentReceiptsState(), action: ReduxAction, prefix: string = TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY): TerminalPaymentReceiptsState {
    state = sharedReducer(state, action, new TerminalPaymentReceiptsState(), TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<TerminalPaymentReceiptsState, TerminalPaymentReceipt, number>(state, action, prefix)
            };
    }
}
