import { NgRedux } from '@angular-redux/store';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse, CurrentUser } from '@skysmack/framework';
import { Injectable } from '@angular/core';
import { AuthenticationStore, AuthenticationAppState } from '@skysmack/redux';

import * as localForage from 'localforage';
import * as _moment from 'moment';
const moment = _moment;

@Injectable({ providedIn: 'root' })
export class NgAuthenticationStore implements AuthenticationStore {
    constructor(
        protected store: NgRedux<AuthenticationAppState>,
    ) { }

    public isCurrentUserAuthenticated(): Observable<boolean> {
        return this.getCurrentUser().pipe(
            map((currentUser: CurrentUser) => {
                let tokenExpired = true;
                if (currentUser) {
                    const loginTime = currentUser.loginTime;
                    const tokenExpires = moment(loginTime).add(currentUser.expires_in, 'seconds');
                    const now = moment().utc();
                    tokenExpired = now.isAfter(tokenExpires);
                }

                return tokenExpired ? false : true;
            })
        );
    }

    public getLoginError(): Observable<HttpErrorResponse> {
        return this.store.select((state: AuthenticationAppState) => state.authentication.loginError);
    }

    public getCurrentUser(): Observable<CurrentUser> {
        // this.store.select((state: AuthenticationAppState) => state.authentication.currentUser);
        return from(localForage.getItem<CurrentUser>('currentUser'));
    }
}
