import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { PhoneLog, PHONE_LOGS_ADDITIONAL_PATHS, PHONE_LOGS_REDUX_KEY } from '@skysmack/packages-phones';

@Injectable({ providedIn: 'root' })
export class NgPhoneLogsRequests extends NgRecordRequests<PhoneLog, number>  {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PHONE_LOGS_REDUX_KEY, PHONE_LOGS_ADDITIONAL_PATHS);
    }
}
