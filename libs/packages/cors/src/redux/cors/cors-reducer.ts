import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { CORS_REDUX_KEY, CORS_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access cors via the GLOBAL state. E.g. state.cors (where cors is the reducer name.)
 */
export class CorsAppState extends AppState {
    public cors: CorsState;
}

export class CorsState {
    public domains: StrIndex<string[]> = {};
}

export function corsReducer(state = new CorsState(), action: ReduxAction, prefix: string = CORS_REDUX_KEY): CorsState {
    state = sharedReducer(state, action, new CorsState(), CORS_REDUCER_KEY);

    switch (action.type) {
        default:
            return state;
    }
}
