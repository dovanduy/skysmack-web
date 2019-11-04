import { AppState, ReduxAction } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { SITE_MINDER_CHANNEL_MANAGER_REDUCER_KEY, SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY } from '../constants/constants';
import { SiteMinderChannelManagerActions } from '../actions/siteminder-channel-manager-actions';
import { HttpErrorResponse, GlobalProperties, StrIndex, LocalObject, LocalObjectExtensions, toLocalObject } from '@skysmack/framework';
import { LodgingTypeAvailability, LodgingTypeAvailabilityKey } from '../models/lodging-type-availability';
import { LodgingTypeRate, LodgingTypeRateKey } from '../models/lodging-type-rate';
import { GetAvailabilitySuccessPayload } from '../payloads/get-availability-succes-payload';
import { GetRatesSuccessPayload } from '../payloads/get-rates-success-payload';

/**
 * This is to be used when you want to access siteminder via the GLOBAL state. E.g. state.siteminder (where siteminder is the reducer name.)
 */
export class SiteMinderChannelManagerAppState extends AppState {
    public siteMinderChannelManager: SiteMinderChannelManagerState;
}

export class SiteMinderChannelManagerState {
    public availability: StrIndex<StrIndex<StrIndex<LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>>>> = {};
    public rates: StrIndex<StrIndex<StrIndex<LocalObject<LodgingTypeRate, LodgingTypeRateKey>>>> = {};
}

export function siteMinderChannelManagerReducer(state = new SiteMinderChannelManagerState(), action: any): SiteMinderChannelManagerState {
    state = sharedReducer(state, action, new SiteMinderChannelManagerState(), SITE_MINDER_CHANNEL_MANAGER_REDUCER_KEY);
    let newState = Object.assign({}, state);

    switch (action.type) {
        // GET_AVAILABILITY
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.GET_AVAILABILITY: {
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.GET_AVAILABILITY_SUCCESS: {
            const castedAction: ReduxAction<GetAvailabilitySuccessPayload> = action;
            const { packagePath, start, end, entities } = castedAction.payload;
            const dateKey = `${start}:${end}`;
            newState.availability[packagePath] = newState.availability[packagePath] ? newState.availability[packagePath] : {};
            newState.availability[packagePath][dateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.availability[packagePath][dateKey], entities.map(x => toLocalObject(x)));
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.GET_AVAILABILITY_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }

        // GET_RATES
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.GET_RATES: {
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.GET_RATES_SUCCESS: {
            const castedAction: ReduxAction<GetRatesSuccessPayload> = action;
            const { packagePath, start, end, entities } = castedAction.payload;
            const dateKey = `${start}:${end}`;
            newState.rates[packagePath] = newState.rates[packagePath] ? newState.rates[packagePath] : {};
            newState.rates[packagePath][dateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.rates[packagePath][dateKey], entities.map(x => toLocalObject(x)));
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.GET_RATES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }

        // UPDATE_AVAILABILITY
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_AVAILABILITY: {
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_AVAILABILITY_SUCCESS: {
            // TODO: Implement
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_AVAILABILITY_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }

        // UPDATE_RATE
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RATE: {
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RATE_SUCCESS: {
            // TODO: Implement
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RATE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }

        // UPDATE_RESTRICTION
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RESTRICTION: {
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RESTRICTION_SUCCESS: {
            // TODO: Implement
            return newState;
        }
        case SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RESTRICTION_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }


        default:
            return {
                ...state
            };
    }
}
