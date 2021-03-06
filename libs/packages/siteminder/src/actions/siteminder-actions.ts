import { ReduxAction } from '@skysmack/redux';
import { Store } from 'redux';
import { SiteMinderAppState } from '../redux/siteminder-reducer';
import { SITE_MINDER_REDUX_KEY } from '../constants/constants';

export class SiteMinderActions {
    public static UPDATE_RATES_UI = 'UPDATE_RATES_UI';
    public static UPDATE_RESTRICTIONS_UI = 'UPDATE_RESTRICTIONS_UI';
    public static UPDATE_ALL_UI = 'UPDATE_ALL_UI';
    public static UPDATE_AVAILABILITY_UI = 'UPDATE_AVAILABILITY_UI';
    public static UPDATE_CHANNELS_UI = 'UPDATE_CHANNELS_UI';
    public static UPDATE_RATE_PLANS_UI = 'UPDATE_RATE_PLANS_UI';
    public static UPDATE_LODGING_TYPES_UI = 'UPDATE_LODGING_TYPES_UI';

    constructor(protected store: Store<SiteMinderAppState>) { }

    public updateRatesUi = (packagePath: string, value: boolean) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_RATES_UI,
            payload: {
                packagePath,
                value
            }
        })));
    }

    public updateRestrictionsUi = (packagePath: string, value: boolean) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_RESTRICTIONS_UI,
            payload: {
                packagePath,
                value
            }
        })));
    }

    public updateAllUi = (packagePath: string, value: boolean) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_ALL_UI,
            payload: {
                packagePath,
                value
            }
        })));
    }

    public updateAvailabilityUi = (packagePath: string, value: boolean) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_AVAILABILITY_UI,
            payload: {
                packagePath,
                value
            }
        })));
    }

    public updateChannelsUi = (packagePath: string, value: number[]) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_CHANNELS_UI,
            payload: {
                packagePath,
                value
            }
        })));
    }

    public updateRatePlansUi = (packagePath: string, value: number[]) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_RATE_PLANS_UI,
            payload: {
                packagePath,
                value
            }
        })));
    }

    public updateLodgingTypesUi = (packagePath: string, value: number[]) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_LODGING_TYPES_UI,
            payload: {
                packagePath,
                value
            }
        })));
    }
}
