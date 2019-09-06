import { Injectable, Inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ApiDomain, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN, HttpSuccessResponse } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';
import { ChangePassword } from '../models/change-password';

@Injectable({ providedIn: 'root' })
export class CommercialAccountService {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    public requestResetPassword(email: string): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.post(`${this.apiDomain.domain}/account/request-reset-password/${email}`, undefined, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public resetPassword(body: any): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.post(`${this.apiDomain.domain}/account/reset-password`, body, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public register(credentials: { email: string, password: string }): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.post(`${this.apiDomain.domain}/account/register`, credentials, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public changePassword(password: ChangePassword): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.post(`${this.apiDomain.domain}/account/change-password`, password, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }
}
