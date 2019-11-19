import { Webhook, WEBHOOKS_REDUX_KEY, WEBHOOKS_ADDITIONAL_PATHS, TransactionRequest, Admin } from '@skysmack/packages-webhooks';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgWebhooksRequests extends NgRecordRequests<Webhook, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, WEBHOOKS_REDUX_KEY, WEBHOOKS_ADDITIONAL_PATHS);
    }

    public admin(packagePath: string, admin: Admin): Observable<HttpResponse<any>> {
        const url = `${this.apiDomain.domain}/${packagePath}/actions/admin`;
        return this.http.post(url, admin, { observe: 'response' }).pipe(catchError(error => of(error)));
    };

    public pay(packagePath: string, transactionRequest: TransactionRequest): Observable<HttpResponse<any>> {
        const url = `${this.apiDomain.domain}/${packagePath}/actions/card-transaction`;
        return this.http.post(url, transactionRequest, { observe: 'response' }).pipe(catchError(error => of(error)));
    };
}
