import { ApiDomain, CurrentUser, HttpErrorResponse } from '@skysmack/framework';
import { ReduxAction, } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthenticationActions, AuthenticationRequests, OpenIdConnectResponse } from '@skysmack/packages-authentication';
import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgAuthenticationRequests implements AuthenticationRequests {

    constructor(
        protected http: HttpClient,
        protected apiDomain: ApiDomain,
        // protected prefix: string
    ) { }

    public login(action: ReduxAction<{ email: string, password: string, path: string }>): Observable<ReduxAction> {
        const url = `${this.apiDomain.domain}/oauth2/password`;
        const params = new HttpParams()
            .append('grant_type', 'password')
            .append('username', action.payload.email)
            .append('password', action.payload.password);

        return this.http.post<OpenIdConnectResponse>(url, params, { observe: 'response' })
            .pipe(
                take(1),
                map((response) => {
                    return Object.assign({}, new ReduxAction<CurrentUser>({
                        type: AuthenticationActions.LOG_IN_SUCCESS,
                        payload: new CurrentUser({
                            resource: response.body.resource,
                            token_type: response.body.token_type,
                            access_token: response.body.access_token,
                            expires_in: response.body.expires_in,
                            loginTime: new Date(moment().toString()),
                            email: action.payload.email
                        })
                    }));
                }),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: AuthenticationActions.LOG_IN_ERROR,
                    payload: error,
                    error: true
                }))))
            );
    }
}
