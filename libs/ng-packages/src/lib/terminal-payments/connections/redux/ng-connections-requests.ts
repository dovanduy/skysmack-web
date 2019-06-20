import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { Connection, ConnectionKey, CONNECTIONS_REDUX_KEY, CONNECTIONS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgConnectionsRequests extends NgRecordRequests<Connection, ConnectionKey> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, CONNECTIONS_REDUX_KEY, CONNECTIONS_ADDITIONAL_PATHS);
    }
}
