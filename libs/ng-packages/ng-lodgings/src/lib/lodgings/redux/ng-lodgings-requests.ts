import { Lodging, LODGINGS_REDUX_KEY, LODGINGS_ADDITIONAL_PATHS } from '@skysmack/packages-lodgings';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingsRequests extends NgRecordRequests<Lodging, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGINGS_REDUX_KEY, LODGINGS_ADDITIONAL_PATHS);
    }
}
