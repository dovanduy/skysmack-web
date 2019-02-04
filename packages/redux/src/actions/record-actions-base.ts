import { Store } from 'redux';
import { PagedQuery, Record, LocalObject, HttpMethod, LocalObjectStatus, HttpResponse, QueueItem } from '@skysmack/framework';
import { ReduxAction } from '../action-types/redux-action';
import { GetPagedRecordsPayload, GetSingleRecordPayload, CancelActionPayload, } from '../payloads';
import { CommitMeta, RollbackMeta, ReduxOfflineMeta, CancelActionMeta, OfflineMeta } from '../metas';
import { EffectRequest } from '../models/effect-request';
import { Effect } from './../models/effect';
import { QueueActions } from './queue-actions';

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

    public cancelRecordAction = <TRecord extends Record<TKey>, TKey>(record: LocalObject<TRecord, TKey>, packagePath: string): void => {
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

    public add<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord, TKey>[], packagePath: string) {
        this.addQueueItems(records, packagePath, 'ADDING')

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
                            value: records
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.ADD_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: records
                        }
                    })
                )
            )
        })));
    }

    public update<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord, TKey>[], packagePath: string) {
        let path = this.addAdditionalPaths(packagePath);
        path = this.appendValues<TKey>(path, records.map(x => x.object.id));

        this.addQueueItems(records, packagePath, 'EDITING');

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
                            value: records
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.UPDATE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: records
                        }
                    })
                )
            )
        })));
    }


    public delete<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord, TKey>[], packagePath: string) {
        let path = this.addAdditionalPaths(packagePath);
        path = path + '?ids=' + records.map(x => x.object.id).join(',');

        this.addQueueItems(records, packagePath, 'DELETING');


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
                            value: records
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<LocalObject<TRecord, TKey>[]>>({
                        type: this.prefix + RecordActionsBase.DELETE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: records
                        }
                    })
                )
            )
        })));
    }

    protected addQueueItems<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord, TKey>[], packagePath: string, actionType: string): void {
        this.store.dispatch({
            type: QueueActions.ADD_QUEUE_ITEMS,
            payload: records.map(record => {
                return new QueueItem({
                    message: `${this.prefix.replace('_', '.')}QUEUE.${actionType.toUpperCase()}`,
                    messageParams: this.getMessageParams(record),
                    packagePath,
                    localObject: record,
                    cancelAction: this.cancelRecordAction,
                });
            })
        });
    }

    // Make abstract and implement in child classes
    protected getMessageParams<TRecord extends Record<TKey>, TKey>(record: LocalObject<TRecord, TKey>): { 0: string } {
        return {
            0: (record as any).object.displayName
        }
    }

    protected addAdditionalPaths(url: string): string {
        return this.additionalPaths ? [url, ...this.additionalPaths].join('/') : url;
    }

    protected appendValues<T>(url, values: T[], prefix: string = '?ids=', seperator: string = ','): string {
        return url + prefix + values.join(seperator);
    }
}