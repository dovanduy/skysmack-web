import { Terminal, TERMINALS_REDUX_KEY, TERMINALS_ADDITIONAL_PATHS, TransactionRequest } from '@skysmack/packages-terminal-payments';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgTerminalsRequests extends NgRecordRequests<Terminal, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, TERMINALS_REDUX_KEY, TERMINALS_ADDITIONAL_PATHS);
    }

    public pay(packagePath: string, transactionRequest: TransactionRequest): Observable<HttpResponse<any>> {
        const url = `${this.apiDomain.domain}/${packagePath}/actions/card-transaction`;
        return this.http.post(url, transactionRequest, { observe: 'response' });
    };
}
