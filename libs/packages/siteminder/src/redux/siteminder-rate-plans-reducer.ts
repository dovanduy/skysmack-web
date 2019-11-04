import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { SITE_MINDER_RATE_PLANS_REDUCER_KEY, SITE_MINDER_RATE_PLANS_REDUX_KEY } from '../constants/constants';
import { RatePlan } from '../models/rate-plan';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class SiteMinderRatePlansAppState extends AppState {
    public siteMinderRatePlans: SiteMinderRatePlansState;
}

export class SiteMinderRatePlansState implements RecordState<RatePlan, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<RatePlan, number>>> = {};
}

export function siteMinderRatePlansReducer(state = new SiteMinderRatePlansState(), action: ReduxAction, prefix: string = SITE_MINDER_RATE_PLANS_REDUX_KEY): SiteMinderRatePlansState {
    state = sharedReducer(state, action, new SiteMinderRatePlansState(), SITE_MINDER_RATE_PLANS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<SiteMinderRatePlansState, RatePlan, number>(state, action, prefix)
            };
    }
}
