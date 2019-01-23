import { LocalPageTypes, StrIndex, LocalObject, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { AppState, ReduxAction, DocumentRecordState, documentRecordReducersBase, sharedReducer } from '@skysmack/redux';
import { Terminal } from './../models/index';

/**
 * This is to be used when you want to access terminals via the GLOBAL state. E.g. state.terminals (where terminals is the reducer name.)
 */
export class TerminalsAppState extends AppState {
    public terminals: TerminalsState;
}

export class TerminalsState implements DocumentRecordState<Terminal, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Terminal, number>>> = {};
    public availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
    public fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
}

export function terminalsReducer(state = new TerminalsState(), action: ReduxAction, prefix: string = 'TERMINALS_'): TerminalsState {
    state = sharedReducer(state, action, new TerminalsState());
    switch (action.type) {
        default:
            return {
                ...state,
                ...documentRecordReducersBase<TerminalsState, Terminal, number>(state, action, prefix)
            };
    }
}
