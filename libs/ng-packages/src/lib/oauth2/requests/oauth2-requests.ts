import { Injectable, Inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationActions, ReduxAction } from '@skysmack/redux';
import { of, Observable } from 'rxjs';
import { ApiDomain, CurrentUser, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { HttpParams, HttpClient } from '@angular/common/http';
import { OpenIdConnectResponse } from '@skysmack/packages-oauth2';

@Injectable({ providedIn: 'root' })
export class Oauth2Requests {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    login(email: string, password: string, authPath: string): Observable<ReduxAction<CurrentUser> | ReduxAction<HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/${authPath}/token`;
        const params = new HttpParams()
            .append('grant_type', 'password')
            .append('username', email)
            .append('password', password);

        return this.http.post<OpenIdConnectResponse>(url, params, { observe: 'response' }).pipe(
            map((response) => {
                return Object.assign({}, new ReduxAction<CurrentUser>({
                    type: AuthenticationActions.LOG_IN_SUCCESS,
                    payload: new CurrentUser({
                        resource: response.body.resource,
                        token_type: response.body.token_type,
                        access_token: response.body.access_token,
                        expires_in: response.body.expires_in,
                        loginTime: new Date(),
                        email: email
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
