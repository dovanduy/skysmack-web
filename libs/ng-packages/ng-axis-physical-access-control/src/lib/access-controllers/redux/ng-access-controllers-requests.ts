import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { ACCESS_CONTROLLERS_REDUX_KEY, ACCESS_CONTROLLERS_ADDITIONAL_PATHS } from './../constants/constants';
import { AccessController, } from '../models/access-controller';

@Injectable({ providedIn: 'root' })
export class NgAccessControllersRequests extends NgRecordRequests<AccessController, string> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, ACCESS_CONTROLLERS_REDUX_KEY, ACCESS_CONTROLLERS_ADDITIONAL_PATHS);
    }
}
