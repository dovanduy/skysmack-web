import { Injectable, Inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationActions, ReduxAction } from '@skysmack/redux';
import { of, Observable } from 'rxjs';
import { ApiDomain, CurrentUser, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenIdConnectResponse } from '@skysmack/packages-oauth2';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({ providedIn: 'root' })
export class OAuth2Requests {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    public login(email: string, password: string, staySignedIn: boolean, authPath: string): Observable<ReduxAction<CurrentUser> | ReduxAction<HttpErrorResponse>> {
        const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

        const url = `${this.apiDomain.domain}/${authPath}/token`;
        let params = new HttpParams()
            .append('grant_type', 'password')
            .append('username', email)
            .append('password', password);

        if (staySignedIn) {
            params = params.append('scope', 'offline_access');
        }

        return this.http.post<OpenIdConnectResponse>(url, params, { headers: headers, observe: 'response' }).pipe(
            map((response) => {
                return Object.assign({}, new ReduxAction<CurrentUser>({
                    type: AuthenticationActions.LOG_IN_SUCCESS,
                    payload: new CurrentUser({
                        resource: response.body.resource,
                        token_type: response.body.token_type,
                        access_token: response.body.access_token,
                        refresh_token: response.body.refresh_token,
                        expires_in: response.body.expires_in,
                        loginTime: new Date().getTime(),
                        email: email,
                        authPath: authPath
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

    public refreshToken(currentUser: CurrentUser): Observable<ReduxAction<CurrentUser> | ReduxAction<HttpErrorResponse>> {
        const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

        if (!currentUser.refresh_token) {
            return of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: AuthenticationActions.REFRESH_TOKEN_ERROR,
                payload: new HttpErrorResponse({
                    message: 'No refresh token'
                }),
                error: true
            })));
        }

        const url = `${this.apiDomain.domain}/${currentUser.authPath}/token`;
        const params = new HttpParams()
            .append('grant_type', 'refresh_token')
            .append('refresh_token', currentUser.refresh_token);

        return this.http.post<OpenIdConnectResponse>(url, params, { headers: headers, observe: 'response' }).pipe(
            map((response) => {
                return Object.assign({}, new ReduxAction<CurrentUser>({
                    type: AuthenticationActions.REFRESH_TOKEN_SUCCESS,
                    payload: new CurrentUser({
                        resource: response.body.resource,
                        token_type: response.body.token_type,
                        access_token: response.body.access_token,
                        refresh_token: response.body.refresh_token ? response.body.refresh_token : currentUser.refresh_token,
                        expires_in: response.body.expires_in,
                        loginTime: new Date().getTime(),
                        email: currentUser.email,
                        authPath: currentUser.authPath
                    })
                }));
            }),
            catchError((error) => {
                return of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: AuthenticationActions.REFRESH_TOKEN_ERROR,
                    payload: error,
                    error: true
                })));
            })
        );
    }
}
