
import { Store, AnyAction } from 'redux';
import { PagedQuery, Record, LocalObject, HttpMethod, LocalObjectStatus, HttpResponse, QueueItem, StrIndex } from '@skysmack/framework';
import { ReduxAction } from '../action-types/redux-action';
import { GetPagedEntitiesPayload, GetSingleEntityPayload, CancelActionPayload, } from '../payloads';
import { CommitMeta, RollbackMeta, ReduxOfflineMeta, CancelActionMeta, OfflineMeta } from '../metas';
import { EffectRequest } from '../models/effect-request';
import { Effect } from './../models/effect';
import { EntityActions } from '../interfaces/entity-actions';

export abstract class RecordActionsBase<TStateType, TStore extends Store<TStateType>> implements EntityActions<unknown, unknown> {
    public static CANCEL_RECORD_ACTION = 'CANCEL_RECORD_ACTION';

    public static GET_PAGED = 'GET_PAGED';
    public static GET_PAGED_SUCCESS = 'GET_PAGED_SUCCESS';
    public static GET_PAGED_FAILURE = 'GET_PAGED_FAILURE';

    public static GET_SINGLE = 'GET_SINGLE';
    public static GET_SINGLE_SUCCESS = 'GET_SINGLE_SUCCESS';
    public static GET_SINGLE_FAILURE = 'GET_SINGLE_FAILURE';

    public static ADD = 'ADD';
    public static ADD_SUCCESS = 'ADD_SUCCESS';
    public static ADD_FAILURE = 'ADD_FAILURE';

    public static UPDATE = 'UPDATE';
    public static UPDATE_SUCCESS = 'UPDATE_SUCCESS';
    public static UPDATE_FAILURE = 'UPDATE_FAILURE';

    public static DELETE = 'DELETE';
    public static DELETE_SUCCESS = 'DELETE_SUCCESS';
    public static DELETE_FAILURE = 'DELETE_FAILURE';

    constructor(
        protected store: TStore,
        protected prefix: string,
        protected additionalPaths: string[]
    ) { }

    public cancelAction = <TRecord extends Record<TKey>, TKey>(record: LocalObject<TRecord, TKey>, packagePath: string): void => {
        this.store.dispatch(Object.assign({}, new ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>({
            type: this.prefix + RecordActionsBase.CANCEL_RECORD_ACTION,
            payload: {
                record,
                packagePath,
                prefix: this.prefix
            },
            meta: new CancelActionMeta()
        })))
    }

    public getPaged = (packagePath: string, pagedQuery: PagedQuery) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetPagedEntitiesPayload>({
            type: this.prefix + RecordActionsBase.GET_PAGED,
            payload: {
                pagedQuery,
                packagePath
            }
        })));
    }

    public getSingle = <TKey>(packagePath: string, id: TKey) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetSingleEntityPayload<TKey>>({
            type: this.prefix + RecordActionsBase.GET_SINGLE,
            payload: {
                id,
                packagePath
            }
        })));
    }

    public add = <TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord, TKey>[], packagePath: string) => {

        records.forEach(record => record.error = false);

        const queueItems = records.map(record => {
            const withQueue = this.prefix + 'QUEUE';
            return new QueueItem({
                message: `${withQueue.replace('_QUEUE', '.QUEUE')}.ADDING`,
                messageParams: this.getMessageParams(record),
                link: `${this.addAdditionalPaths(packagePath)}/create`,
                packagePath,
                localObject: record,
                cancelAction: this.cancelAction
            });
        })

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>>({
            type: this.prefix + RecordActionsBase.ADD,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>(
                    new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
                        this.addAdditionalPaths(packagePath),
                        HttpMethod.POST,
                        records.map(x => x.object)
                    )),
                    new ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.ADD_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: records,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.ADD_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: records,
                            queueItems
                        }
                    })
                )
            )
        })));
    }

    public update = <TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord, TKey>[], packagePath: string) => {
        let path = this.addAdditionalPaths(packagePath);

        records.forEach(record => record.error = false);

        const queueItems = records.map(record => {
            const withQueue = this.prefix + 'QUEUE';
            return new QueueItem({
                message: `${withQueue.replace('_QUEUE', '.QUEUE')}.UPDATING`,
                messageParams: this.getMessageParams(record),
                link: `${this.addAdditionalPaths(packagePath)}/edit/${record.object.id}`,
                packagePath,
                localObject: record,
                cancelAction: this.cancelAction
            });
        });

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>>({
            type: this.prefix + RecordActionsBase.UPDATE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>(
                    new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
                        path,
                        HttpMethod.PUT,
                        records.map(x => x.object)
                    )),
                    new ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.UPDATE_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: records,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.UPDATE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: records,
                            queueItems
                        }
                    })
                )
            )
        })));
    }

    public delete = <TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord, TKey>[], packagePath: string) => {
        let path = this.addAdditionalPaths(packagePath);

        records.forEach(record => record.error = false);

        const queueItems = records.map(record => {
            const withQueue = this.prefix + 'QUEUE';
            return new QueueItem({
                message: `${withQueue.replace('_QUEUE', '.QUEUE')}.DELETING`,
                messageParams: this.getMessageParams(record),
                packagePath,
                localObject: record,
                cancelAction: this.cancelAction,
                deleteAction: this.delete
            });
        });

        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>>({
            type: this.prefix + RecordActionsBase.DELETE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>(
                    new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
                        path,
                        HttpMethod.DELETE,
                        records.map(x => {
                            x.status = LocalObjectStatus.DELETING
                            return x.object
                        }),
                    )),
                    new ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.DELETE_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: records,
                            queueItems
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.DELETE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: records,
                            queueItems
                        }
                    })
                )
            )
        })));
    }

    public abstract getMessageParams(record: LocalObject<any, any>): StrIndex<string>;

    protected addAdditionalPaths(url: string): string {
        return this.additionalPaths ? [url, ...this.additionalPaths].join('/') : url;
    }

    protected appendValues<T>(url, values: T[], prefix: string = '?ids=', seperator: string = ','): string {
        return url + prefix + values.join(seperator);
    }
}