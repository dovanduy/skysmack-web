import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { DoorwayPassCode, DoorwayPassCodeKey } from './../models/doorway-pass-code';
import { DOORWAYS_PASS_CODES_REDUX_KEY, DOORWAYS_PASS_CODES_ADDITIONAL_PATHS } from './../constants/constants';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesRequests extends NgRecordRequests<DoorwayPassCode, DoorwayPassCodeKey> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, DOORWAYS_PASS_CODES_REDUX_KEY, DOORWAYS_PASS_CODES_ADDITIONAL_PATHS);
    }
}
