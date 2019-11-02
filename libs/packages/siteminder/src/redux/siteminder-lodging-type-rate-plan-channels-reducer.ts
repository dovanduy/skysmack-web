import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { SITE_MINDER_RATE_PLANS_REDUCER_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY } from '../constants/constants';
import { LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey } from '../models/lodging-type-rate-plan-channel';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class SiteMinderLodgingTypeRatePlanChannelsAppState extends AppState {
    public siteMinderLodgingTypeRatePlanChannels: SiteMinderLodgingTypeRatePlanChannelsState;
}

export class SiteMinderLodgingTypeRatePlanChannelsState implements RecordState<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<LodgingTypeRatePlanChannelKey>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>>> = {};
}

export function siteMinderLodgingTypeRatePlanChannelsReducer(state = new SiteMinderLodgingTypeRatePlanChannelsState(), action: ReduxAction, prefix: string = SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY): SiteMinderLodgingTypeRatePlanChannelsState {
    state = sharedReducer(state, action, new SiteMinderLodgingTypeRatePlanChannelsState(), SITE_MINDER_RATE_PLANS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<SiteMinderLodgingTypeRatePlanChannelsState, LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>(state, action, prefix)
            };
    }
}
