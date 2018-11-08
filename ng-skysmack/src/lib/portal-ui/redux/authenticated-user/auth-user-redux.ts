import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthUserActions } from './auth-user-actions';
import { CurrentUser } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class AuthUserRedux {

    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: AuthUserActions,
    ) { }

    public login(credentials: { email: string, password: string }): void {
        this.ngRedux.dispatch(this.actions.login(credentials));
    }

    public logout(): void {
        this.ngRedux.dispatch(this.actions.logout());
    }

    public isCurrentUserAuthenticated(): Observable<boolean> {
        return this.ngRedux.select((state: any) => state.authenticatedUser.currentUser).pipe(
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
        return this.ngRedux.select((state: any) => state.authenticatedUser.loginError);
    }

    public clearLoginError(): void {
        this.ngRedux.dispatch(this.actions.clearLoginError());
    }
}
