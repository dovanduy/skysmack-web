import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { DOORWAYS_REDUX_KEY, DOORWAYS_ADDITIONAL_PATHS } from './../constants/constants';
import { Doorway } from '../models/doorway';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysRequests extends NgRecordRequests<Doorway, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, DOORWAYS_REDUX_KEY, DOORWAYS_ADDITIONAL_PATHS);
    }
}
