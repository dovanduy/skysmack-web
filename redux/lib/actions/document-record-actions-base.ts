import { Store } from 'redux';
import { RecordActionsBase } from './record-actions-base';
import { ReduxAction } from './../action-types';
import { PackagePathPayload } from './../payloads/package-path-payload';

export abstract class DocumentRecordActionsBase<TStateType, TStore extends Store<TStateType>> extends RecordActionsBase<TStateType, TStore> {

    public static GET_FIELDS = 'GET_FIELDS';
    public static GET_FIELDS_SUCCESS = 'GET_FIELDS_SUCCESS';
    public static GET_FIELDS_FAILURE = 'GET_FIELDS_FAILURE';

    constructor(
        protected store: TStore,
        protected prefix: string,
        protected additionalPaths: string[],
    ) {
        super(store, prefix, additionalPaths);
    }

    public getFields(packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: this.prefix + DocumentRecordActionsBase.GET_FIELDS,
            payload: {
                packagePath
            }
        })));
    }
}