import { Skysmack } from './../models/skysmack';
import { AppState } from '@skysmack/redux';

export class SkysmackAppState extends AppState {
    public skysmack: SkysmackState;
}

export class SkysmackState {
    skysmack: Skysmack
    tenantLoaded: boolean;
}

const SKYSMACK_STATE: SkysmackState = {
    skysmack: {},
    tenantLoaded: false,
}

export function skysmackReducer(state: SkysmackState = SKYSMACK_STATE, action: any): SkysmackState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'GET_SKYSMACK_SUCCESS':
            newState.skysmack = action.payload;
            newState.tenantLoaded = true;
            return newState;
        default:
            return state;
    }
}
