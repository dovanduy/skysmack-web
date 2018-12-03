import { Store } from 'redux';
import { PagedQuery, Record, LocalObject, HttpMethod, LocalObjectStatus } from '@skysmack/framework';
import { ReduxAction } from '../action-types/redux-action';
import { GetPagedRecordsPayload, GetSingleRecordPayload, CancelActionPayload, } from '../payloads';
import { OfflineMeta, CommitMeta, RollbackMeta, ReduxOfflineMeta, CancelActionMeta } from '../metas';
import { EffectRequest } from '../models/effect-request';
import { Effect } from './../models/effect';

export abstract class RecordActionsBase<TStateType, TStore extends Store<TStateType>> {
    public static CANCEL_RECORD_ACTION = 'CANCEL_RECORD_ACTION';

    public static GET_PAGED = 'GET_PAGED';
    public static GET_PAGED_SUCCESS = RecordActionsBase.GET_PAGED + '_SUCCESS';
    public static GET_PAGED_FAILURE = RecordActionsBase.GET_PAGED + '_FAILURE';

    public static GET_SINGLE = 'GET_SINGLE';
    public static GET_SINGLE_SUCCESS = RecordActionsBase.GET_SINGLE + '_SUCCESS';
    public static GET_SINGLE_FAILURE = RecordActionsBase.GET_SINGLE + '_FAILURE';

    public static ADD = 'ADD';
    public static ADD_SUCCESS = RecordActionsBase.ADD + '_SUCCESS';
    public static ADD_FAILURE = RecordActionsBase.ADD + '_FAILURE';

    public static UPDATE = 'UPDATE';
    public static UPDATE_SUCCESS = RecordActionsBase.UPDATE + '_SUCCESS';
    public static UPDATE_FAILURE = RecordActionsBase.UPDATE + '_FAILURE';

    public static DELETE = 'DELETE';
    public static DELETE_SUCCESS = RecordActionsBase.DELETE + '_SUCCESS';
    public static DELETE_FAILURE = RecordActionsBase.DELETE + '_FAILURE';

    constructor(
        protected store: TStore,
        protected prefix: string,
        protected additionalPaths: string[]
    ) { }

    public cancelRecordAction<TRecord extends Record<TKey>, TKey>(record: LocalObject<TRecord>, packagePath: string): void {
        this.store.dispatch(Object.assign({}, new ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>({
            type: RecordActionsBase.CANCEL_RECORD_ACTION,
            payload: {
                record,
                packagePath
            },
            meta: new CancelActionMeta()
        })))
    }


    public getPaged(packagePath: string, pagedQuery: PagedQuery) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetPagedRecordsPayload>({
            type: this.prefix + RecordActionsBase.GET_PAGED,
            payload: {
                pagedQuery,
                packagePath
            }
        })));
    }

    public getSingle<TKey>(packagePath: string, id: TKey) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetSingleRecordPayload<TKey>>({
            type: this.prefix + RecordActionsBase.GET_SINGLE,
            payload: {
                id,
                packagePath
            }
        })));
    }

    public add<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord>[], packagePath: string) {
        let path = this.additionalPaths ? [packagePath, ...this.additionalPaths].join('/') : packagePath;

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], TRecord, TKey>>({
            type: this.prefix + RecordActionsBase.ADD,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<TRecord[], TRecord, TKey>(
                    new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
                        path,
                        HttpMethod.POST,
                        records.map(x => x.object)
                    )),
                    new ReduxAction<any, CommitMeta<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.ADD_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            records
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.ADD_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            records
                        }
                    })
                )
            )
        })));
    }

    public update<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord>[], packagePath: string) {
        let path = this.additionalPaths ? [packagePath, ...this.additionalPaths].join('/') : packagePath;
        path = path + '?ids=' + records.map(x => x.object.id).join(',');

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], TRecord, TKey>>({
            type: this.prefix + RecordActionsBase.UPDATE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<TRecord[], TRecord, TKey>(
                    new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
                        path,
                        HttpMethod.PUT,
                        records.map(x => x.object)
                    )),
                    new ReduxAction<any, CommitMeta<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.UPDATE_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            records
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.UPDATE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            records
                        }
                    })
                )
            )
        })));
    }


    public delete<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord>[], packagePath: string) {
        let path = this.additionalPaths ? [packagePath, ...this.additionalPaths].join('/') : packagePath;
        path = path + '?ids=' + records.map(x => x.object.id).join(',');

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], TRecord, TKey>>({
            type: this.prefix + RecordActionsBase.DELETE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<TRecord[], TRecord, TKey>(
                    new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
                        path,
                        HttpMethod.DELETE,
                        records.map(x => {
                            x.status = LocalObjectStatus.DELETING
                            return x.object
                        }),
                    )),
                    new ReduxAction<any, CommitMeta<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.DELETE_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            records
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.DELETE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            records
                        }
                    })
                )
            )
        })));
    }
}