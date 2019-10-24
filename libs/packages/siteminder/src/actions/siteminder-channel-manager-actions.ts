import { ReduxAction, EffectRequest, Effect } from '@skysmack/redux';
import { LocalObject, HttpMethod, LocalObjectStatus } from '@skysmack/framework';
import { Store } from 'redux';
import { SiteMinderChannelManagerAppState } from '../redux/siteminder-channel-manager-reducer';
import { GetAvailabilityPayload } from '../payloads/get-availability-payload';
import { SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY } from '../constants/constants';
import { GetRatesPayload } from '../payloads/get-rates-payload';
import { Availability } from '../models/availability';
import { Rate } from '../models/rate';
import { Restriction } from '../models/restriction';

export class SiteMinderChannelManagerActions {

    public static GET_AVAILABILITY = 'GET_AVAILABILITY';
    public static GET_AVAILABILITY_SUCCESS = 'GET_AVAILABILITY_SUCCESS';
    public static GET_AVAILABILITY_FAILURE = 'GET_AVAILABILITY_FAILURE';

    public static GET_RATES = 'GET_RATES';
    public static GET_RATES_SUCCESS = 'GET_RATES_SUCCESS';
    public static GET_RATES_FAILURE = 'GET_RATES_FAILURE';

    public static UPDATE_AVAILABILITY = 'UPDATE_AVAILABILITY';
    public static UPDATE_AVAILABILITY_SUCCESS = 'UPDATE_AVAILABILITY_SUCCESS';
    public static UPDATE_AVAILABILITY_FAILURE = 'UPDATE_AVAILABILITY_FAILURE';

    public static UPDATE_RATE = 'UPDATE_RATE';
    public static UPDATE_RATE_SUCCESS = 'UPDATE_RATE_SUCCESS';
    public static UPDATE_RATE_FAILURE = 'UPDATE_RATE_FAILURE';

    public static UPDATE_RESTRICTION = 'UPDATE_RESTRICTION';
    public static UPDATE_RESTRICTION_SUCCESS = 'UPDATE_RESTRICTION_SUCCESS';
    public static UPDATE_RESTRICTION_FAILURE = 'UPDATE_RESTRICTION_FAILURE';

    constructor(protected store: Store<SiteMinderChannelManagerAppState>) { }

    public getAvailability = (packagePath: string, start: Date, end: Date) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetAvailabilityPayload>({
            type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.GET_AVAILABILITY,
            payload: {
                packagePath,
                start,
                end
            }
        })));
    }

    public getRates = (packagePath: string, start: Date, end: Date) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetRatesPayload>({
            type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.GET_RATES,
            payload: {
                packagePath,
                start,
                end
            }
        })));
    }

    public updateAvailability = (packagePath: string, record: LocalObject<Availability, unknown>) => {
        record.error = false;
        record.status = LocalObjectStatus.MODIFYING

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_AVAILABILITY,
            meta: {
                offline: {
                    effect: new Effect<Availability>(new EffectRequest<Availability>(
                        packagePath,
                        HttpMethod.PUT,
                        record.object
                    )),
                    commit: new ReduxAction<any, { stateKey: string; value: LocalObject<Availability, unknown> }>({
                        type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_AVAILABILITY_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: record
                        }
                    }),
                    rollback: new ReduxAction<any, { stateKey: string; value: LocalObject<Availability, unknown> }>({
                        type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_AVAILABILITY_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: record,
                        }
                    })
                }
            }
        })));
    }

    public updateRate = (packagePath: string, record: LocalObject<Rate, unknown>) => {
        record.error = false;
        record.status = LocalObjectStatus.MODIFYING

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RATE,
            meta: {
                offline: {
                    effect: new Effect<Rate>(new EffectRequest<Rate>(
                        packagePath,
                        HttpMethod.PUT,
                        record.object
                    )),
                    commit: new ReduxAction<any, { stateKey: string; value: LocalObject<Rate, unknown> }>({
                        type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RATE_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: record
                        }
                    }),
                    rollback: new ReduxAction<any, { stateKey: string; value: LocalObject<Rate, unknown> }>({
                        type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RATE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: record,
                        }
                    })
                }
            }
        })));
    }

    public updateRestriction = (packagePath: string, record: LocalObject<Restriction, unknown>) => {
        record.error = false;
        record.status = LocalObjectStatus.MODIFYING

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RESTRICTION,
            meta: {
                offline: {
                    effect: new Effect<Restriction>(new EffectRequest<Restriction>(
                        packagePath,
                        HttpMethod.PUT,
                        record.object
                    )),
                    commit: new ReduxAction<any, { stateKey: string; value: LocalObject<Restriction, unknown> }>({
                        type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RESTRICTION_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: record
                        }
                    }),
                    rollback: new ReduxAction<any, { stateKey: string; value: LocalObject<Restriction, unknown> }>({
                        type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + SiteMinderChannelManagerActions.UPDATE_RESTRICTION_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: record,
                        }
                    })
                }
            }
        })));
    }
}
