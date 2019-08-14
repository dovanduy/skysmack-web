import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { TerminalReceipt } from '../../models/terminal-receipt';
import { TERMINAL_RECEIPTS_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access terminalReceipts via the GLOBAL state. E.g. state.terminalReceipts (where terminalReceipts is the reducer name.)
 */
export class TerminalReceiptsAppState extends AppState {
    public terminalReceipts: TerminalReceiptsState;
}

export class TerminalReceiptsState implements RecordState<TerminalReceipt, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<TerminalReceipt, number>>> = {};
}

export function terminalReceiptsReducer(state = new TerminalReceiptsState(), action: ReduxAction, prefix: string = TERMINAL_RECEIPTS_REDUX_KEY): TerminalReceiptsState {
    state = sharedReducer(state, action, new TerminalReceiptsState(), TERMINAL_RECEIPTS_REDUX_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<TerminalReceiptsState, TerminalReceipt, number>(state, action, prefix)
            };
    }
}
