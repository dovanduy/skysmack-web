import { ReduxAction, AppState, sharedReducer } from '@skysmack/redux';

export function portalReducer(state: AppState = {}, action: ReduxAction): AppState {
    state = sharedReducer(state, action, {});
    const newState = Object.assign({}, state);

    switch (action.type) {
        default:
            return state;
    }
}
