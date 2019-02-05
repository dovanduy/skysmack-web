import { DocumentRecordActionsBase } from "../actions";
import { Record, toLocalObject, HttpSuccessResponse, LocalObject, FieldSchemaViewModel, HttpErrorResponse, LocalObjectExtensions, FieldValueProviderViewModel, replaceLocalInnerObject, LocalObjectStatus } from "@skysmack/framework";
import { ReduxAction } from '../action-types/redux-action';
import { PackagePathPayload, GetFieldsSuccessPayload, GetAvailableFieldsSuccessPayload, GetSingleFieldSuccessPayload } from './../payloads';
import { DocumentRecordState } from './../states/document-record-state';
import { recordReducersBase } from './record-reducers-base';
import { cancelDynamicFieldAction } from './cancel-dynamic-field-action';
import { RollbackMeta } from '../metas/offline-redux/rollback-meta';

export function documentRecordReducersBase<TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: any, prefix: string = ''): TState {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + DocumentRecordActionsBase.CANCEL_DYNAMIC_FIELD_ACTION: {
            return cancelDynamicFieldAction<TState, TRecord, TKey>(newState, action);
        }
        case prefix + DocumentRecordActionsBase.GET_FIELDS_SUCCESS: {
            const castedAction: ReduxAction<GetFieldsSuccessPayload> = action;
            const incomingFields = castedAction.payload.value.map(x => toLocalObject<FieldSchemaViewModel, string>(x, 'key'));
            newState.fields[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[castedAction.payload.packagePath], incomingFields);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_FIELDS_FAILURE: {
            const castedAction: ReduxAction<PackagePathPayload> = action;
            console.log('Fields failure. Error Action:', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS_SUCCESS: {
            const castedAction: ReduxAction<GetAvailableFieldsSuccessPayload> = action;
            const incomingAvailableFields = castedAction.payload.availableFields.map(x => toLocalObject<FieldValueProviderViewModel, string>(x, 'name'));
            newState.availableFields[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldValueProviderViewModel, string>(newState.availableFields[castedAction.payload.packagePath], incomingAvailableFields);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Available fields get error: ', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_SINGLE_FIELD_SUCCESS: {
            const castedAction: ReduxAction<GetSingleFieldSuccessPayload> = action;
            const newField = [toLocalObject<FieldSchemaViewModel, string>(castedAction.payload.value, 'key')];
            newState.fields[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[castedAction.payload.packagePath], newField);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_SINGLE_FIELD_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Get single field error: ', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.ADD_FIELD: {
            const castedAction: ReduxAction<any, { offline: any }> = action;
            const fieldsToBeCreated = castedAction.meta.offline.commit.meta.value;
            const packagePath = castedAction.meta.offline.commit.meta.packagePath;
            newState.fields[packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[packagePath], fieldsToBeCreated);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.ADD_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<FieldSchemaViewModel[] | FieldSchemaViewModel>, { value: LocalObject<FieldSchemaViewModel, string>[], packagePath: string }> = action;
            const body = castedAction.payload.body;
            const newFields = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject<FieldSchemaViewModel, string>(castedAction.meta.value[index], newObject));
            newState.fields[castedAction.meta.packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[castedAction.meta.packagePath], newFields);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.ADD_FIELD_FAILURE: {
            setFieldActionError(action, 'Field add error: ');
            return newState;
        }
        case prefix + DocumentRecordActionsBase.UPDATE_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<FieldSchemaViewModel[] | FieldSchemaViewModel>, { value: LocalObject<FieldSchemaViewModel, string>[], packagePath: string }> = action;
            const body = castedAction.payload.body;
            const updatedFields = (Array.isArray(body) ? body : [body])
                .filter((field) => (castedAction.meta as any).temp === field.key) // TODO: Remove this line when fields return only the modified fields back
                .map((newObject, index) => replaceLocalInnerObject<FieldSchemaViewModel, string>(castedAction.meta.value[index], newObject));
            newState.fields[castedAction.meta.packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[castedAction.meta.packagePath], updatedFields);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.UPDATE_FIELD_FAILURE: {
            setFieldActionError(action, 'Field update error: ');
            return newState;
        }
        case prefix + DocumentRecordActionsBase.DELETE_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<FieldSchemaViewModel[] | FieldSchemaViewModel>, { value: LocalObject<FieldSchemaViewModel, string>[], packagePath: string }> = action;
            castedAction.meta.value.forEach(field => {
                delete newState.fields[castedAction.meta.packagePath][field.localId];
            });
            return newState;
        }
        case prefix + DocumentRecordActionsBase.DELETE_FIELD_FAILURE: {
            setFieldActionError(action, 'Field delete error: ');
            return newState;
        }
        default:
            return {
                ...newState as any,
                ...recordReducersBase(state, action, prefix) as any
            }
    }
}

function setFieldActionError<TRecord extends Record<TKey>, TKey>(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<TRecord, TKey>[]>>, message: string = 'Error: '): void {
    action.meta.value.forEach(record => {
        record.status = LocalObjectStatus.ERROR;
    });
    // TODO: Delete this in production?
    console.log(message, action);
}