import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypeRatePlanChannel, SiteMinderLodgingTypeRatePlanChannelsAppState, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUCER_KEY, LodgingTypeRatePlanChannelKey } from '@skysmack/packages-siteminder';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlanChannelsStore extends NgRecordStore<SiteMinderLodgingTypeRatePlanChannelsAppState, LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> {
    constructor(
        protected ngRedux: NgRedux<SiteMinderLodgingTypeRatePlanChannelsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUCER_KEY); }
}
