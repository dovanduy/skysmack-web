import { CurrentUser } from '@skysmack/framework';
import { AppState, ReduxAction } from '@skysmack/redux';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class AuthenticationAppState extends AppState {
    public authentication: AuthenticationState;
}

export class AuthenticationState {
    authenticatedUser: CurrentUser;
}

export function personsReducer(state = new AuthenticationState(), action: ReduxAction): AuthenticationState {
    switch (action.type) {
        default:
            return state;
    }
}
