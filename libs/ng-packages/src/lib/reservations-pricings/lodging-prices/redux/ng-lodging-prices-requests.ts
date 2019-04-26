import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { LODGING_PRICES_REDUX_KEY, LodgingPrice, LODGING_PRICES_ADDITIONAL_PATHS } from '@skysmack/packages-reservations-pricings';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgLodgingPricesRequests extends NgRecordRequests<LodgingPrice, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGING_PRICES_REDUX_KEY, LODGING_PRICES_ADDITIONAL_PATHS);
    }
}
