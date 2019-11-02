import { AppState, ReduxAction } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { SITE_MINDER_REDUCER_KEY, SITE_MINDER_REDUX_KEY } from '../constants/constants';
import { StrIndex } from '@skysmack/framework';
import { SiteMinderActions } from '../actions';

/**
 * This is to be used when you want to access siteminder via the GLOBAL state. E.g. state.siteminder (where siteminder is the reducer name.)
 */
export class SiteMinderAppState extends AppState {
    public siteMinder: SiteMinderState;
}

export class SiteMinderUi {
    public hideRates: boolean;
    public hideRestrictions: boolean;
    public hideAll: boolean;
    public hideAvailability: boolean;
    public showChannels: number[];
    public showRatePlans: number[];
    public hideLodgingTypes: number[];

    constructor(init?: Partial<SiteMinderUi>) {
        Object.assign(this, init);
    }
}

export class SiteMinderState {
    public ui: StrIndex<SiteMinderUi> = {};
}

export function siteMinderReducer(state = new SiteMinderState(), action: any): SiteMinderState {
    state = sharedReducer(state, action, new SiteMinderState(), SITE_MINDER_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_RATES_UI: {
            const castedAction: ReduxAction<{ packagePath: string, value: boolean }> = action;
            const { packagePath, value } = castedAction.payload;
            newState.ui[packagePath] = newState.ui[packagePath] ? new SiteMinderUi(newState.ui[packagePath]) : new SiteMinderUi({});
            newState.ui[packagePath].hideRates = value;

            return newState;
        }
        case SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_RESTRICTIONS_UI: {
            const castedAction: ReduxAction<{ packagePath: string, value: boolean }> = action;
            const { packagePath, value } = castedAction.payload;
            newState.ui[packagePath] = newState.ui[packagePath] ? newState.ui[packagePath] : new SiteMinderUi({});
            newState.ui[packagePath].hideRestrictions = value;

            return newState;
        }
        case SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_ALL_UI: {
            const castedAction: ReduxAction<{ packagePath: string, value: boolean }> = action;
            const { packagePath, value } = castedAction.payload;
            newState.ui[packagePath] = newState.ui[packagePath] ? newState.ui[packagePath] : new SiteMinderUi({});
            newState.ui[packagePath].hideAll = value;

            return newState;
        }
        case SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_AVAILABILITY_UI: {
            const castedAction: ReduxAction<{ packagePath: string, value: boolean }> = action;
            const { packagePath, value } = castedAction.payload;
            newState.ui[packagePath] = newState.ui[packagePath] ? newState.ui[packagePath] : new SiteMinderUi({});
            newState.ui[packagePath].hideAvailability = value;

            return newState;
        }
        case SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_CHANNELS_UI: {
            const castedAction: ReduxAction<{ packagePath: string, value: number[] }> = action;
            const { packagePath, value } = castedAction.payload;
            newState.ui[packagePath] = newState.ui[packagePath] ? newState.ui[packagePath] : new SiteMinderUi({});
            newState.ui[packagePath].showChannels = value;

            return newState;
        }
        case SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_RATE_PLANS_UI: {
            const castedAction: ReduxAction<{ packagePath: string, value: number[] }> = action;
            const { packagePath, value } = castedAction.payload;
            newState.ui[packagePath] = newState.ui[packagePath] ? newState.ui[packagePath] : new SiteMinderUi({});
            newState.ui[packagePath].showRatePlans = value;

            return newState;
        }
        case SITE_MINDER_REDUX_KEY + SiteMinderActions.UPDATE_LODGING_TYPES_UI: {
            const castedAction: ReduxAction<{ packagePath: string, value: number[] }> = action;
            const { packagePath, value } = castedAction.payload;
            newState.ui[packagePath] = newState.ui[packagePath] ? newState.ui[packagePath] : new SiteMinderUi({});
            newState.ui[packagePath].hideLodgingTypes = value;

            return newState;
        }

        default:
            return {
                ...state
            };
    }
}
