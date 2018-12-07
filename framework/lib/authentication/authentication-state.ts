import { CurrentUser, HttpErrorResponse } from './../models';

/**
 * This is to be used when you want to access persons via the GLOBAL state.
 * E.g. state.authentication (where authentication is the reducer name.)
 */
export class AuthenticationAppState {
    public authentication: AuthenticationState;
}

export class AuthenticationState {
    public currentUser: CurrentUser = null;
    public loginError: HttpErrorResponse = null;
}