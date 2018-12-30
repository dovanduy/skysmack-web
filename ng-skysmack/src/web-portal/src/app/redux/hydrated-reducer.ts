export interface HydratedState {
    hydrated: boolean;
}

export const HYDRATED_INITIAL_STATE: HydratedState = {
    hydrated: false
};

export const TOOGLE_HYDRATED = 'TOOGLE_HYDRATED';

export function hydratedReducer(state: HydratedState = HYDRATED_INITIAL_STATE, action: any) {
    let newState: HydratedState = HYDRATED_INITIAL_STATE;
    switch (action.type) {

        case TOOGLE_HYDRATED:
            return newState = {
                hydrated: action.payload
            } as HydratedState;

        default:
            return state;
    }
}