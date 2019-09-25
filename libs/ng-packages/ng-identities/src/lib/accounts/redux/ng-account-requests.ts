import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpResponse, HttpErrorResponse } from '@skysmack/framework';
import { AccountRequests, ChangePassword, ConfirmEmail, ForgotPassword } from '@skysmack/packages-identities';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgAccountRequests implements AccountRequests {

    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    public changePassword(packagePath: string, changePassword: ChangePassword): Observable<HttpResponse | HttpErrorResponse> {
        const url = `${this.apiDomain.domain}/${packagePath}/account/change-password`;
        return this.http.put<any>(url, changePassword, { observe: 'response' }).pipe(
            map((response) => {
                return response as any;
            }),
            catchError(error => of(error))
        );
    }

    public confirmEmail(packagePath: string, confirmEmail: ConfirmEmail): Observable<HttpResponse | HttpErrorResponse> {
        const url = `${this.apiDomain.domain}/${packagePath}/account/confirm-email`;
        return this.http.put<any>(url, confirmEmail, { observe: 'response' }).pipe(
            map((response) => {
                return response as any;
            }),
            catchError(error => of(error))
        );
    }

    public forgotPassword(packagePath: string, forgotPassword: ForgotPassword): Observable<HttpResponse | HttpErrorResponse> {
        const url = `${this.apiDomain.domain}/${packagePath}/account/forgot-password?email=${forgotPassword.email}`;
        return this.http.put<any>(url, undefined, { observe: 'response' }).pipe(
            catchError(error => of(error))
        );
    }
}
