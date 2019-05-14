import { Terminal, TERMINALS_REDUX_KEY, TERMINALS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgTerminalsRequests extends NgRecordRequests<Terminal, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, TERMINALS_REDUX_KEY, TERMINALS_ADDITIONAL_PATHS);
    }
}
