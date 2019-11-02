import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey } from '../models/lodging-type-rate-plan-channel';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { SiteMinderLodgingTypeRatePlanChannelsAppState } from '../redux/siteminder-lodging-type-rate-plan-channels-reducer';
import { SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS } from '../constants/constants';

export class LodgingTypeRatePlanChannelsActions extends RecordActionsBase<SiteMinderLodgingTypeRatePlanChannelsAppState, Store<SiteMinderLodgingTypeRatePlanChannelsAppState>> {
    constructor(protected store: Store<SiteMinderLodgingTypeRatePlanChannelsAppState>) { super(store, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>): StrIndex<string> {
        return {
            id: 'LodgingTypeRatePlanChannel'
        };
    }
}
