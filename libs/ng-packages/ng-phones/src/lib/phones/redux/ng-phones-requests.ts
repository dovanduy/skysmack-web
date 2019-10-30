import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { Phone, PHONES_ADDITIONAL_PATHS, PHONES_REDUX_KEY } from '@skysmack/packages-phones';

@Injectable({ providedIn: 'root' })
export class NgPhonesRequests extends NgRecordRequests<Phone, number>  {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PHONES_REDUX_KEY, PHONES_ADDITIONAL_PATHS);
    }
}
