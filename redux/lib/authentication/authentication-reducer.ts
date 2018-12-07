import { CurrentUser } from '@skysmack/framework';
import { AuthenticationActions } from './authentication-actions';
import { AuthenticationState } from './authentication-state';
import { ReduxAction } from './../action-types/redux-action';

export function authenticationReducer(state = new AuthenticationState(), action: ReduxAction): AuthenticationState {
    const newState: AuthenticationState = { ...state };
    switch (action.type) {
        case AuthenticationActions.LOG_IN_SUCCESS: {
            const castedAction = action as ReduxAction<CurrentUser>;
            newState.currentUser = castedAction.payload;
            newState.loginError = null;
            return newState;
        }
        case AuthenticationActions.LOG_IN_ERROR: {
            const castedAction = action as ReduxAction<any>;
            console.log('Loging error. Error action: ', castedAction)
            newState.loginError = castedAction.payload
            return newState
        }
        case AuthenticationActions.LOG_OUT: {
            newState.currentUser = null;
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
