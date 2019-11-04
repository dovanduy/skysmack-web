import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { RatePlan, SiteMinderRatePlansAppState, SITE_MINDER_RATE_PLANS_REDUCER_KEY } from '@skysmack/packages-siteminder';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderRatePlansStore extends NgRecordStore<SiteMinderRatePlansAppState, RatePlan, number> {
    constructor(
        protected ngRedux: NgRedux<SiteMinderRatePlansAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, SITE_MINDER_RATE_PLANS_REDUCER_KEY); }
}
