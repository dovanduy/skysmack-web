import { Person } from '@skysmack/packages-persons';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRecordRequests } from './../../../ng-redux/requests/ng-record-requests';
import { ApiDomain } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPersonsRequests extends NgRecordRequests<Person, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'PERSONS_');
    }
}
