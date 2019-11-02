import { LodgingTypeRatePlan, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLANS_ADDITIONAL_PATHS, LodgingTypeRatePlanKey } from '@skysmack/packages-siteminder';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlansRequests extends NgRecordRequests<LodgingTypeRatePlan, LodgingTypeRatePlanKey> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLANS_ADDITIONAL_PATHS);
    }
}
