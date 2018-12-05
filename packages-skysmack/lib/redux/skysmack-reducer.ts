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

export function skysmackReducer(state = SKYSMACK_STATE, action) {
    switch (action.type) {
        case 'GET_SKYSMACK_SUCCESS':
            return {
                ...state,
                skysmack: action.payload,
                tenantLoaded: true,
            }
        default:
            return state;
    }
}
