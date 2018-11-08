import { AuthUserActions } from './auth-user-actions';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrentUser } from '@skysmack/framework';

export interface AuthUserState {
    currentUser: CurrentUser;
    loginError: HttpErrorResponse;
}

export const AUTH_USER_INITIAL_STATE: AuthUserState = {
    currentUser: null,
    loginError: null
};

export function authUserReducer(state: AuthUserState = AUTH_USER_INITIAL_STATE, action: any) {
    let newState: AuthUserState = AUTH_USER_INITIAL_STATE;
    switch (action.type) {
        case AuthUserActions.LOG_IN_SUCCESS:
            return newState = {
                ...state,
                currentUser: action.payload,
                loginError: null
            };

        case AuthUserActions.LOG_IN_ERROR:
            return newState = {
                ...state,
                loginError: action.payload,
            };

        case AuthUserActions.LOG_OUT:
            return newState = {
                ...state,
                currentUser: null,
            };

        case AuthUserActions.CLEAR_LOGIN_ERROR:
            return newState = {
                ...state,
                loginError: null,
            };

        default:
            return state;
    }
}
