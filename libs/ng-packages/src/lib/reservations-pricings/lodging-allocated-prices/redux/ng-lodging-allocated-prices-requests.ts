import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { LODGING_ALLOCATED_PRICES_REDUX_KEY, LodgingAllocatedPrice, LODGING_ALLOCATED_PRICES_ADDITIONAL_PATHS } from '@skysmack/packages-reservations-pricings';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgLodgingAllocatedPricesRequests extends NgRecordRequests<LodgingAllocatedPrice, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGING_ALLOCATED_PRICES_REDUX_KEY, LODGING_ALLOCATED_PRICES_ADDITIONAL_PATHS);
    }
}
