import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ActionsObservable, combineEpics, ofType, Epic } from 'redux-observable';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AuthUserActions } from './auth-user-actions';
import { AuthUserRequests } from './auth-user-requests';
import { CurrentUser } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class AuthUserEpics {
    public static PASSWORD_FLOW = 'password';
    public epics: Epic[];

    constructor(
        public ngRedux: NgRedux<any>,
        public authUserActions: AuthUserActions,
        public authUserRequests: AuthUserRequests,
    ) {
        this.epics = [
            this.loginEpic
        ];
    }

    public loginEpic = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthUserActions.LOG_IN), // Run on action
        switchMap((action) => this.authUserRequests.login(
            AuthUserEpics.PASSWORD_FLOW,
            action.payload.email,
            action.payload.password
        ).pipe(
            take(1), // Prevents infinite loop on login
            map((response: any) => {
                return {
                    resource: response.resource,
                    token_type: response.token_type,
                    access_token: response.access_token,
                    expires_in: response.expires_in,
                    loginTime: new Date(moment().toString()),
                    email: action.payload.email
                } as CurrentUser;
            }),
            map(currentUser => {
                return this.authUserActions.loginSuccess(currentUser);
            }),
            catchError(error => {
                this.ngRedux.dispatch(this.authUserActions.loginError(error)); // Error handling
                return new Promise(() => { }) as any; // Satisfy redux and rxjs (prevents both from throwing new errors)
            }),
        )),
    )
}
