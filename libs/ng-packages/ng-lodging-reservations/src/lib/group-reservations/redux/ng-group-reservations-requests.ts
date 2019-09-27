import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { GroupReservation, GROUP_RESERVATIONS_REDUX_KEY, GROUP_RESERVATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgGroupReservationsRequests extends NgRecordRequests<GroupReservation, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, GROUP_RESERVATIONS_REDUX_KEY, GROUP_RESERVATIONS_ADDITIONAL_PATHS);
    }
}
