import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { DoorwayRelation, DoorwayRelationKey } from './../models/doorway-relation';
import { DOORWAY_RELATIONS_REDUX_KEY, DOORWAY_RELATIONS_ADDITIONAL_PATHS } from './../constants/constants';

@Injectable({ providedIn: 'root' })
export class NgDoorwayRelationsRequests extends NgRecordRequests<DoorwayRelation, DoorwayRelationKey> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, DOORWAY_RELATIONS_REDUX_KEY, DOORWAY_RELATIONS_ADDITIONAL_PATHS);
    }
}
