import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Receipt } from '../../models/receipt';
import { RECEIPTS_REDUX_KEY, RECEIPTS_REDUCER_KEY } from '../../constants';

/**
 * This is to be used when you want to access receipts via the GLOBAL state. E.g. state.receipts (where receipts is the reducer name.)
 */
export class ReceiptsAppState extends AppState {
    public receipts: ReceiptsState;
}

export class ReceiptsState implements RecordState<Receipt, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Receipt, number>>> = {};
}

export function receiptsReducer(state = new ReceiptsState(), action: ReduxAction, prefix: string = RECEIPTS_REDUX_KEY): ReceiptsState {
    state = sharedReducer(state, action, new ReceiptsState(), RECEIPTS_REDUCER_KEY);
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<ReceiptsState, Receipt, number>(state, action, prefix)
            };
    }
}
