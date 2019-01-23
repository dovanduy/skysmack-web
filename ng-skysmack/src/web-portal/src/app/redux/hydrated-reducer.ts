import { sharedReducer } from '@skysmack/redux';

export class HydratedState {
    public hydrated = false;
}

export const TOOGLE_HYDRATED = 'TOOGLE_HYDRATED';

export function hydratedReducer(state = new HydratedState(), action: any): HydratedState {
    state = sharedReducer(state, action, new HydratedState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case TOOGLE_HYDRATED: {
            newState.hydrated = action.payload;
            return newState;
        }
        default:
            return state;
    }
}
