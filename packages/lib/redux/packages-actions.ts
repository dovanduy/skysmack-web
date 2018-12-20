import { Store } from 'redux';
import { ReduxAction, Effect, EffectRequest, PackagePathPayload } from '@skysmack/redux';
import { Package, HttpMethod, LocalObject, LocalObjectStatus } from '@skysmack/framework';

export class PackagesActions<TStateType, TStore extends Store<TStateType>> {
    public static CANCEL_RECORD_ACTION = 'CANCEL_RECORD_ACTION';

    public static GET_PACKAGES = 'GET_PACKAGES';
    public static GET_PACKAGES_SUCCESS = 'GET_PACKAGES_SUCCESS';
    public static GET_PACKAGES_FAILURE = 'GET_PACKAGES_FAILURE';

    public static GET_AVAILABLE_PACKAGES = 'GET_AVAILABLE_PACKAGES';
    public static GET_AVAILABLE_PACKAGES_SUCCESS = 'GET_AVAILABLE_PACKAGES_SUCCESS';
    public static GET_AVAILABLE_PACKAGES_FAILURE = 'GET_AVAILABLE_PACKAGES_FAILURE';

    public static GET_SINGLE_PACKAGE = 'GET_SINGLE_PACKAGE';
    public static GET_SINGLE_PACKAGE_SUCCESS = 'GET_SINGLE_PACKAGE_SUCCESS';
    public static GET_SINGLE_PACKAGE_FAILURE = 'GET_SINGLE_PACKAGE_FAILURE';

    public static ADD_PACKAGE = 'ADD_PACKAGE';
    public static ADD_PACKAGE_SUCCESS = 'ADD_PACKAGE_SUCCESS';
    public static ADD_PACKAGE_FAILURE = 'ADD_PACKAGE_FAILURE';

    public static UPDATE_PACKAGE = 'UPDATE_PACKAGE';
    public static UPDATE_PACKAGE_SUCCESS = 'UPDATE_PACKAGE_SUCCESS';
    public static UPDATE_PACKAGE_FAILURE = 'UPDATE_PACKAGE_FAILURE';

    public static DELETE_PACKAGE = 'DELETE_PACKAGE';
    public static DELETE_PACKAGE_SUCCESS = 'DELETE_PACKAGE_SUCCESS';
    public static DELETE_PACKAGE_FAILURE = 'DELETE_PACKAGE_FAILURE';

    constructor(
        protected store: TStore,
    ) { }

    public get() {
        this.store.dispatch(Object.assign({}, new ReduxAction({
            type: PackagesActions.GET_PACKAGES
        })));
    }

    public getSingle(path: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: PackagesActions.GET_SINGLE_PACKAGE,
            payload: { packagePath: path }
        })));
    }

    public getAvailablePackages() {
        this.store.dispatch(Object.assign({}, new ReduxAction({
            type: PackagesActions.GET_AVAILABLE_PACKAGES
        })));
    }


    public add(packages: LocalObject<Package>[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: PackagesActions.ADD_PACKAGE,
            meta: {
                offline: {
                    effect: new Effect<Package[]>(new EffectRequest<Package[]>(
                        'skysmack/packages',
                        HttpMethod.POST,
                        packages.map(x => x.object)
                    )),
                    commit: new ReduxAction({
                        type: PackagesActions.ADD_PACKAGE_SUCCESS,
                        meta: {
                            packages
                        }
                    }),
                    rollback: new ReduxAction({
                        type: PackagesActions.ADD_PACKAGE_FAILURE,
                        meta: {
                            packages
                        }
                    })
                }
            }
        })));
    }

    public update(packages: LocalObject<Package>[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: PackagesActions.UPDATE_PACKAGE,
            meta: {
                offline: {
                    effect: new Effect<Package[]>(new EffectRequest<Package[]>(
                        'skysmack/packages',
                        HttpMethod.PUT,
                        packages.map(x => x.object)
                    )),
                    commit: new ReduxAction({
                        type: PackagesActions.UPDATE_PACKAGE_SUCCESS,
                        meta: {
                            packages
                        }
                    }),
                    rollback: new ReduxAction({
                        type: PackagesActions.UPDATE_PACKAGE_FAILURE,
                        meta: {
                            packages
                        }
                    })
                }
            }
        })));
    }

    public delete(packages: LocalObject<Package>[]) {
        const paths = '?paths=' + packages.map(x => x.object.path).join('&paths=');

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: PackagesActions.DELETE_PACKAGE,
            meta: {
                offline: {
                    effect: new Effect<Package[]>(new EffectRequest<Package[]>(
                        'skysmack/packages' + paths,
                        HttpMethod.DELETE,
                        packages.map(x => {
                            x.status = LocalObjectStatus.DELETING
                            return x.object
                        })
                    )),
                    commit: new ReduxAction({
                        type: PackagesActions.DELETE_PACKAGE_SUCCESS,
                        meta: {
                            packages
                        }
                    }),
                    rollback: new ReduxAction({
                        type: PackagesActions.DELETE_PACKAGE_FAILURE,
                        meta: {
                            packages
                        }
                    })
                }
            }
        })));
    }
}
