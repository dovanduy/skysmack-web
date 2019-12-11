import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { ACCESS_POINTS_REDUX_KEY, ACCESS_POINTS_ADDITIONAL_PATHS } from './../constants/constants';
import { AccessPoint, } from '../models/access-point';

@Injectable({ providedIn: 'root' })
export class NgAccessPointsRequests extends NgRecordRequests<AccessPoint, string> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, ACCESS_POINTS_REDUX_KEY, ACCESS_POINTS_ADDITIONAL_PATHS);
    }
}
