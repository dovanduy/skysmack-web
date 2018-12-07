import { Store } from 'redux';
import { ReduxAction } from './../action-types/redux-action';
import { CredentialsPayload } from './../payloads/credentials-payload';

export class AuthenticationActions<TStateType, TStore extends Store<TStateType>> {

    public static LOG_IN = 'LOG_IN';
    public static LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
    public static LOG_IN_ERROR = 'LOG_IN_ERROR';
    public static CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';
    public static LOG_OUT = 'LOG_OUT';

    constructor(
        protected store: TStore,
    ) { }

    public login(credentials: { email: string; password: string; }): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<CredentialsPayload>({
            type: AuthenticationActions.LOG_IN,
            payload: credentials
        })));
    }

    public clearLoginError(): void {
        this.store.dispatch(Object.assign({}, new ReduxAction({
            type: AuthenticationActions.CLEAR_LOGIN_ERROR
        })));
    }

    public logout(): void {
        this.store.dispatch(Object.assign({}, new ReduxAction({
            type: AuthenticationActions.LOG_OUT
        })));
    }
}