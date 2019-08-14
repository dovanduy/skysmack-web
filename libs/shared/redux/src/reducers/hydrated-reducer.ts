import { sharedReducer } from './shared-reducer';

export class HydratedAppState {
    public hydrated: HydratedState;
}

export class HydratedState {
    public hydrated = false;
}

export const TOOGLE_HYDRATED = 'TOOGLE_HYDRATED';

export function hydratedReducer(state = new HydratedState(), action: any): HydratedState {
    // Hydrated must be true on logout, or the app loads forever on logout
    // This happens because the auth interceptor listens for hydrated: "true"
    // which it normally only becomes in app startup.
    const logoutState = new HydratedState();
    logoutState.hydrated = true;
    state = sharedReducer(state, action, logoutState, 'hydrated');
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
