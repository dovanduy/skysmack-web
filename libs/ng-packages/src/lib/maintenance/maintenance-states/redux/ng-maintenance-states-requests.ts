import { MaintenanceState, MAINTENANCE_STATES_ADDITIONAL_PATHS, MAINTENANCE_STATES_REDUX_KEY } from '@skysmack/packages-maintenance';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesRequests extends NgRecordRequests<MaintenanceState, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, MAINTENANCE_STATES_REDUX_KEY, MAINTENANCE_STATES_ADDITIONAL_PATHS);
    }
}
