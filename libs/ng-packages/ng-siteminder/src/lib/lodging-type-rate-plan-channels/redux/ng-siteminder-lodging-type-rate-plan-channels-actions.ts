import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SiteMinderLodgingTypeRatePlanChannelsAppState, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS, LodgingTypeRatePlanChannel } from '@skysmack/packages-siteminder';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlanChannelsActions extends RecordActionsBase<SiteMinderLodgingTypeRatePlanChannelsAppState, NgRedux<SiteMinderLodgingTypeRatePlanChannelsAppState>> {
    constructor(protected store: NgRedux<SiteMinderLodgingTypeRatePlanChannelsAppState>) { super(store, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingTypeRatePlanChannel, number>): StrIndex<string> {
        return {
            id: 'LodgingTypeRatePlanChannel'
        };
    }
}
