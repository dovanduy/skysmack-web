import { Terminal } from '@skysmack/packages-terminal-payments';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgDocmentRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgTerminalsRequests extends NgDocmentRecordRequests<Terminal, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'TERMINALS_', [ 'terminals' ]);
    }
}
