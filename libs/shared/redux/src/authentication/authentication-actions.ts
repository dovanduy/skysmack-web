import { Store } from 'redux';
import { ReduxAction } from './../action-types/redux-action';
import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';

export class AuthenticationActions<TStateType, TStore extends Store<TStateType>> {

    public static LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
    public static LOG_IN_ERROR = 'LOG_IN_ERROR';
    public static CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';
    public static LOG_OUT = 'LOG_OUT';

    constructor(
        protected store: TStore,
    ) { }

    public clearLoginError(): void {
        this.store.dispatch(Object.assign({}, new ReduxAction({
            type: AuthenticationActions.CLEAR_LOGIN_ERROR
        })));
    }

    public logout(): void {
        this.store.dispatch({ type: RESET_STATE });
        this.store.dispatch(Object.assign({}, new ReduxAction({
            type: AuthenticationActions.LOG_OUT
        })));
    }
}
