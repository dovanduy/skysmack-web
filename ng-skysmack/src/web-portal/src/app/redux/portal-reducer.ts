import { ReduxAction, AppState } from '@skysmack/redux';

export function portalReducer(state: AppState = {}, action: ReduxAction): AppState {

    switch (action.type) {
        default:
            return state;
    }
}
