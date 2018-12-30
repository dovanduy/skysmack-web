import { CurrentUser, HttpErrorResponse } from '@skysmack/framework';
import { AppState } from './../states/app-state';

/**
 * This is to be used when you want to access persons via the GLOBAL state.
 * E.g. state.authentication (where authentication is the reducer name.)
 */
export class AuthenticationAppState extends AppState {
    public authentication: AuthenticationState;
}

export class AuthenticationState {
    public currentUser: CurrentUser = null;
    public loginError: HttpErrorResponse = null;
}