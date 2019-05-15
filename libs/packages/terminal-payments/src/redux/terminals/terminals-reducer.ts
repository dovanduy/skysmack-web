import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer, RecordState, recordReducersBase } from '@skysmack/redux';
import { Terminal } from '../../models/index';
import { TERMINALS_REDUX_KEY } from '../../constants';

/**
 * This is to be used when you want to access terminals via the GLOBAL state. E.g. state.terminals (where terminals is the reducer name.)
 */
export class TerminalsAppState extends AppState {
    public terminals: TerminalsState;
}

export class TerminalsState implements RecordState<Terminal, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Terminal, number>>> = {};
}

export function terminalsReducer(state = new TerminalsState(), action: ReduxAction, prefix: string = TERMINALS_REDUX_KEY): TerminalsState {
    state = sharedReducer(state, action, new TerminalsState());
    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<TerminalsState, Terminal, number>(state, action, prefix)
            };
    }
}
