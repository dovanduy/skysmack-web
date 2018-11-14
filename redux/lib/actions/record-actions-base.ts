import { Store } from 'redux';
import { GetSingleRecordAction, GetPagedRecordsAction } from '../action-types';
import { PagedQuery } from '@skysmack/framework';

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


    public getPaged(packagePath: string, pagedQuery: PagedQuery): GetPagedRecordsAction {
        return this.store.dispatch(Object.assign({}, new GetPagedRecordsAction({
            type: this.prefix + RecordActionsBase.GET_PAGED,
            packagePath: packagePath,
            pagedQuery: pagedQuery
        })));
    }


    public getSingle<TKey>(packagePath: string, id: TKey): GetSingleRecordAction<TKey> {
        return this.store.dispatch(Object.assign({}, new GetSingleRecordAction<TKey>({
            type: this.prefix + RecordActionsBase.GET_SINGLE,
            packagePath: packagePath,
            id: id
        })));
    }
}