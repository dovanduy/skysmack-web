import { LodgingTypeRatePlanChannel, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS, LodgingTypeRatePlanChannelKey } from '@skysmack/packages-siteminder';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlanChannelsRequests extends NgRecordRequests<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS);
    }
}
