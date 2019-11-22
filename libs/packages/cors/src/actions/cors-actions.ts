import { Store } from 'redux';
import { CORS_REDUX_KEY, CORS_ADDITIONAL_PATHS } from '../constants/constants';
import { CorsAppState } from '../redux/cors/cors-reducer';
import { ReduxAction, PackagePathPayload, EffectRequest, Effect } from '@skysmack/redux';
import { HttpMethod } from '@skysmack/framework';

export class CorsActions {
    public static GET_DOMAINS = 'GET_DOMAINS';
    public static GET_DOMAINS_SUCCESS = 'GET_DOMAINS_SUCCESS';
    public static GET_DOMAINS_FAILURE = 'GET_DOMAINS_FAILURE';

    public static PUT_DOMAINS = 'PUT_DOMAINS';
    public static PUT_DOMAINS_SUCCESS = 'PUT_DOMAINS_SUCCESS';
    public static PUT_DOMAINS_FAILURE = 'PUT_DOMAINS_FAILURE';

    public static DELETE_DOMAINS = 'DELETE_DOMAINS';
    public static DELETE_DOMAINS_SUCCESS = 'DELETE_DOMAINS_SUCCESS';
    public static DELETE_DOMAINS_FAILURE = 'DELETE_DOMAINS_FAILURE';

    constructor(
        protected store: Store<CorsAppState>
    ) { }

    public getDomains(packagePath: string): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: CORS_REDUX_KEY + CorsActions.GET_DOMAINS,
            payload: {
                packagePath
            }
        })));
    }

    public putDomain(packagePath: string, domain: string): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: CORS_REDUX_KEY + CorsActions.PUT_DOMAINS,
            meta: {
                offline: {
                    effect: new Effect<string[]>(new EffectRequest<string[]>(
                        packagePath,
                        HttpMethod.PUT,
                        [domain]
                    )),
                    commit: new ReduxAction<any, { stateKey: string; value: string[] }>({
                        type: CORS_REDUX_KEY + CorsActions.PUT_DOMAINS_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: [domain]
                        }
                    }),
                    rollback: new ReduxAction<any, { stateKey: string; value: string[] }>({
                        type: CORS_REDUX_KEY + CorsActions.PUT_DOMAINS_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: [domain,]
                        }
                    })
                }
            }
        })));
    }

    public deleteDomain(packagePath: string, domain: string): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: CORS_REDUX_KEY + CorsActions.DELETE_DOMAINS,
            meta: {
                offline: {
                    effect: new Effect<string[]>(new EffectRequest<string[]>(
                        `${packagePath}?domains=${domain}`,
                        HttpMethod.DELETE
                    )),
                    commit: new ReduxAction<any, { stateKey: string; value: string[] }>({
                        type: CORS_REDUX_KEY + CorsActions.DELETE_DOMAINS_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: [domain]
                        }
                    }),
                    rollback: new ReduxAction<any, { stateKey: string; value: string[] }>({
                        type: CORS_REDUX_KEY + CorsActions.DELETE_DOMAINS_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: [domain],
                        }
                    })
                }
            }
        })));
    }
}
