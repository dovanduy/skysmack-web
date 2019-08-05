import { CurrentUser } from '@skysmack/framework';
import { AuthenticationActions } from './authentication-actions';
import { AuthenticationState } from './authentication-state';
import { ReduxAction } from './../action-types/redux-action';
import { sharedReducer } from './../reducers';

export function authenticationReducer(state = new AuthenticationState(), action: ReduxAction): AuthenticationState {
    state = sharedReducer(state, action, new AuthenticationState(), 'authentication');
    const newState = Object.assign({}, state);
    
    switch (action.type) {
        case AuthenticationActions.LOG_IN_SUCCESS: {
            const castedAction = action as ReduxAction<CurrentUser>;
            newState.currentUser = castedAction.payload;
            newState.loginError = null;
            return newState;
        }
        case AuthenticationActions.LOG_IN_ERROR: {
            const castedAction = action as ReduxAction<any>;
            newState.currentUser = null;
            newState.loginError = castedAction.payload
            return newState
        }
        case AuthenticationActions.REFRESH_TOKEN_SUCCESS: {
            const castedAction = action as ReduxAction<CurrentUser>;
            newState.currentUser = castedAction.payload;
            newState.loginError = null;
            return newState;
        }
        case AuthenticationActions.REFRESH_TOKEN_ERROR: {
            const castedAction = action as ReduxAction<any>;
            newState.currentUser = null; // Refresh token error, log out user
            newState.loginError = castedAction.payload
            return newState
        }
        case AuthenticationActions.CLEAR_LOGIN_ERROR: {
            newState.loginError = null;
            return newState;
        }
        default:
            return state;
    }
}
