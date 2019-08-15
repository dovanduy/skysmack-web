import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { Client, CLIENTS_ADDITIONAL_PATHS, CLIENTS_REDUX_KEY } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgClientsRequests extends NgRecordRequests<Client, string> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, CLIENTS_REDUX_KEY, CLIENTS_ADDITIONAL_PATHS);
    }
}
