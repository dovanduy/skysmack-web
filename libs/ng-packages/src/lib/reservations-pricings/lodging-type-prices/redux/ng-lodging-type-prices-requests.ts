import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { LODGING_TYPE_PRICES_REDUX_KEY, LodgingTypePrice, LODGING_TYPE_PRICES_ADDITIONAL_PATHS } from '@skysmack/packages-reservations-pricings';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesRequests extends NgRecordRequests<LodgingTypePrice, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGING_TYPE_PRICES_REDUX_KEY, LODGING_TYPE_PRICES_ADDITIONAL_PATHS);
    }
}
