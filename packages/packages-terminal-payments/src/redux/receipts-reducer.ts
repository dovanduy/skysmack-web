import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase } from '@skysmack/redux';
import { Receipt } from './../models/receipt';

/**
 * This is to be used when you want to access receipts via the GLOBAL state. E.g. state.receipts (where receipts is the reducer name.)
 */
export class ReceiptsAppState extends AppState {
    public receipts: ReceiptsState;
}

export class ReceiptsState implements DocumentRecordState<Receipt, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Receipt, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function receiptsReducer(state = new ReceiptsState(), action: ReduxAction, prefix: string = 'RECEIPTS_'): ReceiptsState {
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<ReceiptsState, Receipt, number>(state, action, prefix)
            };
    }
}
