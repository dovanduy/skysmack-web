import { Store } from 'redux';
import { PagedQuery } from '@skysmack/framework';
import { ReduxAction } from '../action-types/redux-action';
import { GetPagedRecordsPayload, GetSingleRecordPayload } from '../payloads';

export abstract class RecordActionsBase<TStateType, TStore extends Store<TStateType>> {
    public static GET_PAGED = 'GET_PAGED';
    public static GET_PAGED_SUCCESS = RecordActionsBase.GET_PAGED + '_SUCCESS';
    public static GET_PAGED_FAILURE = RecordActionsBase.GET_PAGED + '_FAILURE';

    public static GET_SINGLE = 'GET_SINGLE';
    public static GET_SINGLE_SUCCESS = RecordActionsBase.GET_SINGLE + '_SUCCESS';
    public static GET_SINGLE_FAILURE = RecordActionsBase.GET_SINGLE + '_FAILURE';

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
}