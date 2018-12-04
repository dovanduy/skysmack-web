import { AuthenticationActions, AuthenticationAppState } from '@skysmack/packages-authentication';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ReduxAction, CredentialsPayload } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class NgAuthenticationActions extends AuthenticationActions<AuthenticationAppState, NgRedux<AuthenticationAppState>>  {


    constructor(
        protected store: NgRedux<AuthenticationAppState>,
    ) {
        super(store);
    }

    public login(credentials: { email: string; password: string; }): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<CredentialsPayload>({
            type: NgAuthenticationActions.LOG_IN,
            payload: credentials
        })));
    }

    public clearLoginError(): void {
        this.store.dispatch(Object.assign({}, new ReduxAction({
            type: NgAuthenticationActions.CLEAR_LOGIN_ERROR
        })));
    }

    public logout(): void {
        this.store.dispatch(Object.assign({}, new ReduxAction({
            type: NgAuthenticationActions.LOG_OUT
        })));
    }
}
