import { Store } from 'redux';

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

    // public getPaged(packagePath: string, pagedQuery: PagedQuery) {
    //     this.store.dispatch(Object.assign({}, new ReduxAction<GetPagedRecordsPayload>({
    //         type: this.prefix + RecordActionsBase.GET_PAGED,
    //         payload: {
    //             pagedQuery,
    //             packagePath
    //         }
    //     })));
    // }

    // public getSingle<TKey>(packagePath: string, id: TKey) {
    //     this.store.dispatch(Object.assign({}, new ReduxAction<GetSingleRecordPayload<TKey>>({
    //         type: this.prefix + RecordActionsBase.GET_SINGLE,
    //         payload: {
    //             id,
    //             packagePath
    //         }
    //     })));
    // }

    // public add<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord>[], packagePath: string) {
    //     let path = this.additionalPaths ? [packagePath, ...this.additionalPaths].join('/') : packagePath;

    //     this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], TRecord, TKey>>({
    //         type: this.prefix + RecordActionsBase.ADD,
    //         meta: new ReduxOfflineMeta(
    //             new OfflineMeta<TRecord[], TRecord, TKey>(
    //                 new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
    //                     path,
    //                     HttpMethod.POST,
    //                     records.map(x => x.object)
    //                 )),
    //                 new ReduxAction<any, CommitMeta<TRecord, TKey>>({
    //                     type: this.prefix + RecordActionsBase.ADD_SUCCESS,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         records
    //                     }
    //                 }),
    //                 new ReduxAction<any, RollbackMeta<TRecord, TKey>>({
    //                     type: this.prefix + RecordActionsBase.ADD_FAILURE,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         records
    //                     }
    //                 })
    //             )
    //         )
    //     })));
    // }

    // public update<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord>[], packagePath: string) {
    //     let path = this.additionalPaths ? [packagePath, ...this.additionalPaths].join('/') : packagePath;
    //     path = path + '?ids=' + records.map(x => x.object.id).join(',');

    //     this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], TRecord, TKey>>({
    //         type: this.prefix + RecordActionsBase.UPDATE,
    //         meta: new ReduxOfflineMeta(
    //             new OfflineMeta<TRecord[], TRecord, TKey>(
    //                 new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
    //                     path,
    //                     HttpMethod.PUT,
    //                     records.map(x => x.object)
    //                 )),
    //                 new ReduxAction<any, CommitMeta<TRecord, TKey>>({
    //                     type: this.prefix + RecordActionsBase.UPDATE_SUCCESS,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         records
    //                     }
    //                 }),
    //                 new ReduxAction<any, RollbackMeta<TRecord, TKey>>({
    //                     type: this.prefix + RecordActionsBase.UPDATE_FAILURE,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         records
    //                     }
    //                 })
    //             )
    //         )
    //     })));
    // }


    // public delete<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord>[], packagePath: string) {
    //     let path = this.additionalPaths ? [packagePath, ...this.additionalPaths].join('/') : packagePath;
    //     path = path + '?ids=' + records.map(x => x.object.id).join(',');

    //     this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], TRecord, TKey>>({
    //         type: this.prefix + RecordActionsBase.DELETE,
    //         meta: new ReduxOfflineMeta(
    //             new OfflineMeta<TRecord[], TRecord, TKey>(
    //                 new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
    //                     path,
    //                     HttpMethod.DELETE,
    //                     records.map(x => {
    //                         x.status = LocalObjectStatus.DELETING
    //                         return x.object
    //                     }),
    //                 )),
    //                 new ReduxAction<any, CommitMeta<TRecord, TKey>>({
    //                     type: this.prefix + RecordActionsBase.DELETE_SUCCESS,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         records
    //                     }
    //                 }),
    //                 new ReduxAction<any, RollbackMeta<TRecord, TKey>>({
    //                     type: this.prefix + RecordActionsBase.DELETE_FAILURE,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         records
    //                     }
    //                 })
    //             )
    //         )
    //     })));
    // }
}
