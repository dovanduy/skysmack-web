import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { DoorwayOption } from './../models/doorway-option';
import { DOORWAYS_OPTIONS_REDUX_KEY, DOORWAYS_OPTIONS_ADDITIONAL_PATHS } from './../constants/constants';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysOptionsRequests extends NgRecordRequests<DoorwayOption, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, DOORWAYS_OPTIONS_REDUX_KEY, DOORWAYS_OPTIONS_ADDITIONAL_PATHS);
    }
}
