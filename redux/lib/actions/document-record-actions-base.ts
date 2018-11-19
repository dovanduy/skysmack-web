import { Store } from 'redux';
import { RecordActionsBase } from './record-actions-base';

export abstract class DocumentRecordActionsBase<TStateType, TStore extends Store<TStateType>> extends RecordActionsBase<TStateType, TStore> {

    public static GET_FIELDS = 'GET_FIELDS';
    public static GET_FIELDS_SUCCESS = 'GET_FIELDS_SUCCESS';
    public static GET_FIELDS_FAILURE = 'GET_FIELDS_FAILURE';

    constructor(
        protected store: TStore,
        protected prefix: string
    ) {
        super(store, prefix);
    }

    public getFields(packagePath: string) {
        // this.store.dispatch(Object.assign({}, new GetPagedRecordsAction({
        //     type: this.prefix + RecordActionsBase.GET_PAGED,
        //     packagePath: packagePath,
        //     pagedQuery: pagedQuery
        // })));
    }
}