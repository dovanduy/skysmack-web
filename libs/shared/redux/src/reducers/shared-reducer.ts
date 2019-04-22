import { AuthenticationActions } from '../authentication/authentication-actions';

export function sharedReducer(state: any, action: any, initialState: any): any {
    state = Object.freeze(state);

    switch (action.type) {
        case AuthenticationActions.LOG_OUT: {
            return initialState;
        }
        default:
            return state;
    }
}
