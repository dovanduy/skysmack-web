import { Store } from 'redux';
import { PagedQuery, Record, LocalObject, HttpMethod } from '@skysmack/framework';
import { ReduxAction } from '../action-types/redux-action';
import { GetPagedRecordsPayload, GetSingleRecordPayload, } from '../payloads';
import { OfflineMeta, CommitMeta, RollbackMeta, ReduxOfflineMeta } from '../metas';
import { EffectRequest } from '../models/effect-request';
import { Effect } from './../models/effect';

export abstract class RecordActionsBase<TStateType, TStore extends Store<TStateType>> {
    public static GET_PAGED = 'GET_PAGED';
    public static GET_PAGED_SUCCESS = RecordActionsBase.GET_PAGED + '_SUCCESS';
    public static GET_PAGED_FAILURE = RecordActionsBase.GET_PAGED + '_FAILURE';

    public static GET_SINGLE = 'GET_SINGLE';
    public static GET_SINGLE_SUCCESS = RecordActionsBase.GET_SINGLE + '_SUCCESS';
    public static GET_SINGLE_FAILURE = RecordActionsBase.GET_SINGLE + '_FAILURE';

    public static ADD = 'ADD';
    public static ADD_SUCCESS = RecordActionsBase.ADD + '_SUCCESS';
    public static ADD_FAILURE = RecordActionsBase.ADD + '_FAILURE';

    constructor(
        protected store: TStore,
        protected prefix: string
    ) { }

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

    public add<TRecord extends Record<TKey>, TKey>(records: LocalObject<TRecord>[], path: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], TRecord, TKey>>({
            type: this.prefix + RecordActionsBase.ADD,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<TRecord[], TRecord, TKey>(
                    new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
                        path,
                        HttpMethod.POST,
                        records.map(x => x.object),
                    )),
                    new ReduxAction<any, CommitMeta<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.ADD_SUCCESS,
                        meta: {
                            stateKey: path,
                            records
                        }
                    }),
                    new ReduxAction<any, RollbackMeta<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.ADD_FAILURE,
                        meta: {
                            stateKey: path,
                            records
                        }
                    })
                )
            )
        })));
    }
}