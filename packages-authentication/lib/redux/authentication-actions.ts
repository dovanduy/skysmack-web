import { Store } from 'redux';
import { CurrentUser, HttpErrorResponse } from '@skysmack/framework';

export abstract class AuthenticationActions<TStateType, TStore extends Store<TStateType>> {

    public static LOG_IN = 'LOG_IN';
    public static LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
    public static LOG_IN_ERROR = 'LOG_IN_ERROR';
    public static CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';
    public static LOG_OUT = 'LOG_OUT';

    constructor(
        protected store: TStore,
        protected prefix: string
    ) { }

    public abstract login(credentials: { email: string, password: string }): void;

    public abstract loginSuccess(currentUser: CurrentUser): void;

    public abstract loginError(error: HttpErrorResponse): void;

    public abstract clearLoginError(): void;

    public abstract logout(): void;
}