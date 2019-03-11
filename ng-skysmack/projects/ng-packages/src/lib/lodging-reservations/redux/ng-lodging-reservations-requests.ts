import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, } from '@skysmack/framework';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgRecordRequests } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsRequests extends NgRecordRequests<LodgingReservation, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'LODGING_RESERVATIONS_', []);
    }
}
