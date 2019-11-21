import { PassCode, PASS_CODES_REDUX_KEY, PASS_CODES_ADDITIONAL_PATHS } from '@skysmack/packages-pass-codes';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgPassCodesRequests extends NgRecordRequests<PassCode, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PASS_CODES_REDUX_KEY, PASS_CODES_ADDITIONAL_PATHS);
    }
}
