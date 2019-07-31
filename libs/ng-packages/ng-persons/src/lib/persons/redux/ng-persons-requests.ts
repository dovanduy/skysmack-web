import { Person, PERSONS_REDUX_KEY, PERSONS_ADDITIONAL_PATHS } from '@skysmack/packages-persons';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgPersonsRequests extends NgRecordRequests<Person, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PERSONS_REDUX_KEY, PERSONS_ADDITIONAL_PATHS);
    }
}
