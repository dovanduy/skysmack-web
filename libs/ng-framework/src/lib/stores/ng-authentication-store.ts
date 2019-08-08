import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse, CurrentUser, IsAuthenticated } from '@skysmack/framework';
import { Injectable } from '@angular/core';
import { AuthenticationStore, AuthenticationAppState } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class NgAuthenticationStore implements AuthenticationStore {
    constructor(
        protected store: NgRedux<AuthenticationAppState>,
    ) { }

    public isCurrentUserAuthenticated(): Observable<boolean> {
        return this.getCurrentUser().pipe(
            map((currentUser: CurrentUser) => {
                return IsAuthenticated(currentUser);
                // let tokenExpired = true;
                // if (currentUser && currentUser.loginTime) {
                //     tokenExpired = Date.now() > (new Date(currentUser.loginTime).getTime() + currentUser.expires_in * 1000); // now.isAfter(tokenExpires);
                // }

                // return tokenExpired ? false : true;
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
