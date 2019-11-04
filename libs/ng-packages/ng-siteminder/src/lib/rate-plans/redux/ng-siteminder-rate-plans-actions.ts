import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SiteMinderRatePlansAppState, SITE_MINDER_RATE_PLANS_REDUX_KEY, SITE_MINDER_RATE_PLANS_ADDITIONAL_PATHS, RatePlan } from '@skysmack/packages-siteminder';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderRatePlansActions extends RecordActionsBase<SiteMinderRatePlansAppState, NgRedux<SiteMinderRatePlansAppState>> {
    constructor(protected store: NgRedux<SiteMinderRatePlansAppState>) { super(store, SITE_MINDER_RATE_PLANS_REDUX_KEY, SITE_MINDER_RATE_PLANS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<RatePlan, number>): StrIndex<string> {
        return {
            displayName: record.object.name
        };
    }
}
