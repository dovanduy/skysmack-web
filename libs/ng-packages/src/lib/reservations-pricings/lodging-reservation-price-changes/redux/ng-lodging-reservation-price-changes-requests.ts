import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY, LodgingReservationPriceChange, LODGING_RESERVATION_PRICE_CHANGES_ADDITIONAL_PATHS } from '@skysmack/packages-reservations-pricings';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationPriceChangesRequests extends NgRecordRequests<LodgingReservationPriceChange, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY, LODGING_RESERVATION_PRICE_CHANGES_ADDITIONAL_PATHS);
    }
}
