import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUCER_KEY } from '../constants/constants';
import { LodgingTypeRatePlan, LodgingTypeRatePlanKey } from '../models/lodging-type-rate-plan';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class SiteMinderLodgingTypeRatePlansAppState extends AppState {
    public siteMinderLodgingTypeRatePlans: SiteMinderLodgingTypeRatePlansState;
}

export class SiteMinderLodgingTypeRatePlansState implements RecordState<LodgingTypeRatePlan, LodgingTypeRatePlanKey> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<LodgingTypeRatePlanKey>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingTypeRatePlan, LodgingTypeRatePlanKey>>> = {};
}

export function siteMinderLodgingTypeRatePlansReducer(state = new SiteMinderLodgingTypeRatePlansState(), action: ReduxAction, prefix: string = SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUX_KEY): SiteMinderLodgingTypeRatePlansState {
    state = sharedReducer(state, action, new SiteMinderLodgingTypeRatePlansState(), SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<SiteMinderLodgingTypeRatePlansState, LodgingTypeRatePlan, LodgingTypeRatePlanKey>(state, action, prefix)
            };
    }
}
