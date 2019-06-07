import { Store } from 'redux';
import { ReduxAction, Effect, EffectRequest, PackagePathPayload, CancelActionMeta, EntityActions, GetPagedEntitiesPayload, ReduxOfflineMeta, RollbackMeta, CommitMeta, OfflineMeta } from '@skysmack/redux';
import { Package, HttpMethod, LocalObject, LocalObjectStatus, StrIndex, PagedQuery, HttpResponse, QueueItem } from '@skysmack/framework';

export class PackagesActions<TStateType, TStore extends Store<TStateType>> implements EntityActions<Package, string> {
    public static CANCEL_PACKAGE_ACTION = 'CANCEL_PACKAGE_ACTION';

    public static PACKAGES_GET_PAGED = 'PACKAGES_GET_PAGED';
    public static PACKAGES_GET_PAGED_SUCCESS = 'PACKAGES_GET_PAGED_SUCCESS';
    public static PACKAGES_GET_PAGED_FAILURE = 'PACKAGES_GET_PAGED_FAILURE';

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

    public cancelAction = (_package: LocalObject<Package, string>): void => {
        this.store.dispatch(Object.assign({}, new ReduxAction<{ _package: LocalObject<Package, string> }, CancelActionMeta>({
            type: PackagesActions.CANCEL_PACKAGE_ACTION,
            payload: {
                _package,
            },
            meta: new CancelActionMeta()
        })))
    }

    public getPaged(packagePath: string, pagedQuery: PagedQuery) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetPagedEntitiesPayload>({
            type: PackagesActions.PACKAGES_GET_PAGED,
            payload: {
                pagedQuery,
                packagePath
            }
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

    public add = (packages: LocalObject<Package, string>[]) => {

        packages.forEach(_package => _package.error = false);

        const queueItems = packages.map(_package => {
            return new QueueItem({
                message: `PACKAGES.ADDING`,
                messageParams: this.getMessageParams(_package),
                link: `packages/create`,
                packagePath: 'packages',
                localObject: _package,
                cancelAction: this.cancelAction
            });
        })

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<Package[], HttpResponse, LocalObject<Package, string>[]>>({
            type: PackagesActions.ADD_PACKAGE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<Package[], HttpResponse, LocalObject<Package, string>[]>(
                    new Effect<Package[]>(new EffectRequest<Package[]>(
                        'packages',
                        HttpMethod.POST,
                        packages.map(x => x.object)
                    )),
                    new ReduxAction<any, CommitMeta<LocalObject<Package, string>[]>>({
                        type: PackagesActions.ADD_PACKAGE_SUCCESS,
                        meta: {
                            stateKey: '',
                            value: packages,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<Package, string>[]>>({
                        type: PackagesActions.ADD_PACKAGE_FAILURE,
                        meta: {
                            stateKey: '',
                            value: packages,
                            queueItems
                        }
                    })
                )
            )
        })));
    }

    public update = (packages: LocalObject<Package, string>[]) => {
        const paths = '?paths=' + packages.map(x => x.object.path).join('&paths=');


        packages.forEach(_package => _package.error = false);

        const queueItems = packages.map(_package => {
            return new QueueItem({
                message: `PACKAGES.UPDATING`,
                messageParams: this.getMessageParams(_package),
                link: `packages`,
                packagePath: 'packages' + paths,
                localObject: _package,
                cancelAction: this.cancelAction
            });
        });

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<Package[], HttpResponse, LocalObject<Package, string>[]>>({
            type: PackagesActions.UPDATE_PACKAGE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<Package[], HttpResponse, LocalObject<Package, string>[]>(
                    new Effect<Package[]>(new EffectRequest<Package[]>(
                        'packages' + paths,
                        HttpMethod.PUT,
                        packages.map(x => x.object)
                    )),
                    new ReduxAction<any, CommitMeta<LocalObject<Package, string>[]>>({
                        type: PackagesActions.UPDATE_PACKAGE_SUCCESS,
                        meta: {
                            stateKey: '',
                            value: packages,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<Package, string>[]>>({
                        type: PackagesActions.UPDATE_PACKAGE_FAILURE,
                        meta: {
                            stateKey: '',
                            value: packages,
                            queueItems
                        }
                    })
                )
            )
        })));
    }

    public delete = (packages: LocalObject<Package, string>[]) => {
        const paths = '?paths=' + packages.map(x => x.object.path).join('&paths=');


        packages.forEach(_package => _package.error = false);

        const queueItems = packages.map(_package => {
            return new QueueItem({
                message: `PACKAGES.DELETING`,
                messageParams: this.getMessageParams(_package),
                packagePath: 'packages' + paths,
                localObject: _package,
                cancelAction: this.cancelAction,
                deleteAction: this.delete
            });
        });

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<Package[], HttpResponse, LocalObject<Package, string>[]>>({
            type: PackagesActions.DELETE_PACKAGE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<Package[], HttpResponse, LocalObject<Package, string>[]>(
                    new Effect<Package[]>(new EffectRequest<Package[]>(
                        'packages' + paths,
                        HttpMethod.DELETE,
                        packages.map(x => {
                            x.status = LocalObjectStatus.DELETING
                            return x.object
                        }),
                    )),
                    new ReduxAction<any, CommitMeta<LocalObject<Package, string>[]>>({
                        type: PackagesActions.DELETE_PACKAGE_SUCCESS,
                        meta: {
                            stateKey: '',
                            value: packages,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<Package, string>[]>>({
                        type: PackagesActions.DELETE_PACKAGE_FAILURE,
                        meta: {
                            stateKey: '',
                            value: packages,
                            queueItems
                        }
                    })
                )
            )
        })));
    }

    public getMessageParams(_package: LocalObject<Package, string>): StrIndex<string> {
        return {
            name: _package.object.name
        };
    };

    protected appendValues<T>(url, values: T[], prefix: string = '?ids=', seperator: string = ','): string {
        return url + prefix + values.join(seperator);
    }
}
