import { NgRedux } from '@angular-redux/store';
import { AuthenticationAppState } from '@skysmack/packages-authentication';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUser, HttpErrorResponse } from '@skysmack/framework';
import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgAuthenticationStore {
    constructor(
        protected store: NgRedux<AuthenticationAppState>,
    ) { }

    public isCurrentUserAuthenticated(): Observable<boolean> {
        return this.store.select((state: AuthenticationAppState) => state.authentication.currentUser).pipe(
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
}
