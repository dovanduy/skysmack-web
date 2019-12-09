import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { LODGINGS_DOORWAYS_REDUX_KEY, LODGINGS_DOORWAYS_ADDITIONAL_PATHS } from './../constants/constants';
import { LodgingDoorway, LodgingDoorwayKey } from '../models/lodging-doorway';

@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysRequests extends NgRecordRequests<LodgingDoorway, LodgingDoorwayKey> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGINGS_DOORWAYS_REDUX_KEY, LODGINGS_DOORWAYS_ADDITIONAL_PATHS);
    }
}
