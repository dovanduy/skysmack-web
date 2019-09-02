import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ApiDomain, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN, HttpSuccessResponse } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommercialAccountService {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    public register(credentials: { email: string, password: string }) {
        return this.http.post(`${this.apiDomain.domain}/account/register`, credentials, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }

    public forgotPassword(): Observable<any> {
        // Not implemented
        return of();
    }

    public changePassword(password: any): Observable<HttpSuccessResponse | HttpErrorResponse> {
        return this.http.post(`${this.apiDomain.domain}/account/password`, password, { observe: 'response' }).pipe(
            catchError((error) => of(error))
        );
    }
}
