import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, AnyAction } from 'redux';
import { AuthUserRequests } from './auth-user-requests';
import { CurrentUser } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class AuthUserActions {

    public static LOG_IN = 'LOG_IN';
    public static LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

    public static LOG_OUT = 'LOG_OUT';

    public static LOG_IN_ERROR = 'LOG_IN_ERROR';
    public static CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';

    constructor(public requests: AuthUserRequests, ) { }

    public login(credentials: { email: string, password: string }): AnyAction {
        return {
            type: AuthUserActions.LOG_IN,
            payload: credentials
        };
    }

    public loginSuccess(currentUser: CurrentUser): AnyAction {
        return {
            type: AuthUserActions.LOG_IN_SUCCESS,
            payload: currentUser
        };
    }


    public loginError(error: HttpErrorResponse): AnyAction {
        return {
            type: AuthUserActions.LOG_IN_ERROR,
            payload: error
        };
    }

    public clearLoginError(): Action {
        return { type: AuthUserActions.CLEAR_LOGIN_ERROR };
    }

    public logout(): Action {
        return { type: AuthUserActions.LOG_OUT };
    }
}

