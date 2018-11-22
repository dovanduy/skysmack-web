import { ReduxAction, AppState } from '@skysmack/redux';

export function portalReducer(state: AppState = {}, action: ReduxAction) {

    switch (action.type) {
        default:
            return state;
    }
}
