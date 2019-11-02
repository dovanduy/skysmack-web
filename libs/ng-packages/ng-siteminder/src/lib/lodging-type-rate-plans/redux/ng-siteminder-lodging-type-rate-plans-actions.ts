import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SiteMinderLodgingTypeRatePlansAppState, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLANS_ADDITIONAL_PATHS, LodgingTypeRatePlan } from '@skysmack/packages-siteminder';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlansActions extends RecordActionsBase<SiteMinderLodgingTypeRatePlansAppState, NgRedux<SiteMinderLodgingTypeRatePlansAppState>> {
    constructor(protected store: NgRedux<SiteMinderLodgingTypeRatePlansAppState>) { super(store, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLANS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingTypeRatePlan, number>): StrIndex<string> {
        return {
            id: 'LodgingTypeRatePlan'
        };
    }
}
