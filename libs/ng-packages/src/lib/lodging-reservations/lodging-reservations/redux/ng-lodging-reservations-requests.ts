import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, } from '@skysmack/framework';
import { LodgingReservation, LODGING_RESERVATIONS_REDUX_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-lodging-reservations';
import { NgRecordRequests } from '@skysmack/ng-framework';


@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsRequests extends NgRecordRequests<LodgingReservation, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGING_RESERVATIONS_REDUX_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS);
    }
}
