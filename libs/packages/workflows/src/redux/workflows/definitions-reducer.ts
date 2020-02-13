import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Definition } from '../../models/definition';
import { sharedReducer } from '@skysmack/redux';
import { DEFINITIONS_REDUX_KEY, DEFINITIONS_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access definitions via the GLOBAL state. E.g. state.definitions (where definitions is the reducer name.)
 */
export class DefinitionsAppState extends AppState {
    public definitions: DefinitionsState;
}

export class DefinitionsState implements RecordState<Definition, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Definition, number>>> = {};
}

export function definitionsReducer(state = new DefinitionsState(), action: ReduxAction, prefix: string = DEFINITIONS_REDUX_KEY): DefinitionsState {
    state = sharedReducer(state, action, new DefinitionsState(), DEFINITIONS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<DefinitionsState, Definition, number>(state, action, prefix)
            };
    }
}
