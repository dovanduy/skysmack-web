import { toLocalObject, HttpSuccessResponse, LocalObject, HttpErrorResponse, LocalObjectExtensions, replaceLocalInnerObject, GlobalProperties, PageResponse, PageExtensions, LoadingState, HttpResponse, FieldSchemaViewModel, LocalObjectStatus, FieldValueProviderViewModel } from "@skysmack/framework";
import { ReduxAction } from '../action-types/redux-action';
import { GetPagedRecordsPayload, GetPagedRecordsSuccessPayload, GetSingleRecordSuccessPayload, GetAvailableFieldsSuccessPayload } from './../payloads';
import { cancelFieldAction } from './cancel-field-action';
import { FieldState } from '../states/field-state';
import { FieldActions } from '../actions/field-actions';
import { ReduxOfflineMeta } from '../metas/offline-redux/redux-offline-meta';
import { CommitMeta } from '../metas/offline-redux/commit-meta';
import { RollbackMeta } from '../metas/offline-redux/rollback-meta';

export function fieldReducer(state: FieldState, action: any, prefix: string = ''): FieldState {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + FieldActions.CANCEL_DYNAMIC_FIELD_ACTION: {
            return cancelFieldAction(newState, action);
        }
        case prefix + FieldActions.FIELD_GET_PAGED: {
            const castedAction: ReduxAction<GetPagedRecordsPayload> = action;
            const page = new PageResponse<string>({
                pageNumber: castedAction.payload.pagedQuery.pageNumber,
                pageSize: castedAction.payload.pagedQuery.pageSize,
                ids: [],
                links: null,
                query: castedAction.payload.pagedQuery.rsqlFilter.toList().build(),
                sort: castedAction.payload.pagedQuery.sort.build()
            });
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPage(newState.localPageTypes[castedAction.payload.packagePath], page, LoadingState.Loading);
            return newState;
        }
        case prefix + FieldActions.FIELD_GET_PAGED_SUCCESS: {
            const castedAction: ReduxAction<GetPagedRecordsSuccessPayload<any, string>> = action;
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPage(newState.localPageTypes[castedAction.payload.packagePath], castedAction.payload.page);
            newState.fields[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.fields[castedAction.payload.packagePath], castedAction.payload.records.map(x => toLocalObject(x)));
            return newState;
        }
        case prefix + FieldActions.FIELD_GET_PAGED_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case prefix + FieldActions.FIELD_GET_SINGLE_SUCCESS: {
            const castedAction: ReduxAction<GetSingleRecordSuccessPayload<any, string>> = action;
            newState.fields[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.fields[castedAction.payload.packagePath], [toLocalObject(castedAction.payload.record)]);
            return newState;
        }
        case prefix + FieldActions.FIELD_GET_SINGLE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case prefix + FieldActions.FIELD_GET_AVAILABLE_FIELDS_SUCCESS: {
            const castedAction: ReduxAction<GetAvailableFieldsSuccessPayload> = action;
            const incomingAvailableFields = castedAction.payload.availableFields.map(x => toLocalObject<FieldValueProviderViewModel, string>(x, 'name'));
            newState.availableFields[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldValueProviderViewModel, string>(newState.availableFields[castedAction.payload.packagePath], incomingAvailableFields);
            return newState;
        }
        case prefix + FieldActions.FIELD_GET_AVAILABLE_FIELDS_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case prefix + FieldActions.FIELD_ADD: {
            const castedAction: ReduxAction<null, ReduxOfflineMeta<any[], HttpResponse, LocalObject<any, string>[]>> = action;
            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const recordsToBeCreated = castedAction.meta.offline.commit.meta.value;
            newState.fields[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.fields[stateKey], recordsToBeCreated);
            return newState;
        }
        case prefix + FieldActions.FIELD_ADD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, CommitMeta<LocalObject<any, string>[]>> = action;
            const body = castedAction.payload.body;
            const newObjects = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject(castedAction.meta.value[index], newObject));
            newState.fields[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<any, string>(newState.fields[castedAction.meta.stateKey], newObjects);
            return newState;
        }
        case prefix + FieldActions.FIELD_ADD_FAILURE: {
            setActionError(action, 'Add error: ');
            return newState;
        }
        case prefix + FieldActions.FIELD_UPDATE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>> = action;
            const body = castedAction.payload.body;
            const updatedObjects = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject(castedAction.meta.value[index], newObject));
            newState.fields[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[castedAction.meta.stateKey], updatedObjects, LocalObjectStatus.MODIFYING);
            return newState;
        }
        case prefix + FieldActions.FIELD_UPDATE_FAILURE: {
            setActionError(action, 'Update error: ');
            return newState;
        }
        case prefix + FieldActions.FIELD_DELETE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<FieldSchemaViewModel[] | FieldSchemaViewModel>, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>> = action;
            castedAction.meta.value.forEach(record => {
                delete newState.fields[castedAction.meta.stateKey][record.localId];
            });
            return newState;
        }
        case prefix + FieldActions.FIELD_DELETE_FAILURE: {
            setActionError(action, 'Delete error: ');
            return newState;
        }
        default:
            return state;
    }
}


function setActionError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<FieldSchemaViewModel, string>[]>>, message: string = 'Error: '): void {
    action.meta.value.forEach(record => {
        record.error = true;
        if (!record.object.key) {
            record.object.key = '' as any;
        }
    });
    if (!GlobalProperties.production) {
        console.log(message, action);
    }
}
