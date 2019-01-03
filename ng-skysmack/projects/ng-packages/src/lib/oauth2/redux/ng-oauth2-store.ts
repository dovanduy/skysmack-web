import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse, CurrentUser } from '@skysmack/framework';
import * as _moment from 'moment';
import { Injectable } from '@angular/core';
import { AuthenticationStore, AuthenticationAppState } from '@skysmack/redux';
const moment = _moment;

@Injectable({ providedIn: 'root' })
export class NgOauth2Store implements AuthenticationStore {
    constructor(
        public store: NgRedux<AuthenticationAppState>,
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
        return this.store.select((state: AuthenticationAppState) => state.authentication.currentUser);
    }
}
