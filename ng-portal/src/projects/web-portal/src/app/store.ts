import { OfflineState } from '@redux-offline/redux-offline/lib/types';

export function portalReducer(state: any = {}, action) {
    let newState: any;
    switch (action.type) {
        default:
            return state;
    }
}

export interface IAppState {
    offline?: OfflineState;
}
