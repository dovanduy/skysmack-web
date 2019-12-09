import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY, LODGINGS_RESERVATIONS_PASS_CODES_ADDITIONAL_PATHS } from './../constants/constants';
import { LodgingReservationPassCode, LodgingReservationPassCodeKey } from '../models/lodging-reservation-pass-code';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsPassCodesRequests extends NgRecordRequests<LodgingReservationPassCode, LodgingReservationPassCodeKey> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY, LODGINGS_RESERVATIONS_PASS_CODES_ADDITIONAL_PATHS);
    }
}
