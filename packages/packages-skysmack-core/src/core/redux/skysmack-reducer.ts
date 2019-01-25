import { AppState, sharedReducer } from '@skysmack/redux';
import { SkysmackActions } from './skysmack-actions';

export class SkysmackAppState extends AppState {
    public skysmack: SkysmackState;
}

export class SkysmackState {
    public skysmack = {};
    public tenantLoaded = false;
}

export function skysmackReducer(state = new SkysmackState(), action: any): SkysmackState {
    state = sharedReducer(state, action, new SkysmackState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SkysmackActions.GET_SKYSMACK_SUCCESS:
            newState.skysmack = action.payload;
            newState.tenantLoaded = true;
            return newState;
        case SkysmackActions.GET_SKYSMACK_FAILURE:
            newState.tenantLoaded = true;
            return newState;
        default:
            return state;
    }
}
