import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLANS_ADDITIONAL_PATHS } from '../constants/constants';
import { LodgingTypeRatePlan, LodgingTypeRatePlanKey } from '../models/lodging-type-rate-plan';
import { SiteMinderLodgingTypeRatePlansAppState } from '../redux/siteminder-lodging-type-rate-plans-reducer';

export class LodgingTypeRatePlansActions extends RecordActionsBase<SiteMinderLodgingTypeRatePlansAppState, Store<SiteMinderLodgingTypeRatePlansAppState>> {
    constructor(protected store: Store<SiteMinderLodgingTypeRatePlansAppState>) { super(store, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUX_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLANS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingTypeRatePlan, LodgingTypeRatePlanKey>): StrIndex<string> {
        return {
            id: 'LodgingTypeRatePlan'
        };
    }
}
