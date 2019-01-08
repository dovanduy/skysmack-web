import { DocumentRecordActionsBase } from "../actions";
import { Record, toLocalObject, HttpSuccessResponse, LocalObject, FieldSchemaViewModel, HttpErrorResponse, LocalObjectStatus, LocalObjectExtensions, FieldValueProviderViewModel } from "@skysmack/framework";
import { ReduxAction } from '../action-types/redux-action';
import { PackagePathPayload, GetFieldsSuccessPayload, GetAvailableFieldsSuccessPayload, GetSingleFieldSuccessPayload } from './../payloads';
import { DocumentRecordState } from './../states/document-record-state';
import { recordReducersBase } from './record-reducers-base';


export function documentRecordReducersBase<TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: any, prefix: string = ''): TState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + DocumentRecordActionsBase.GET_FIELDS_SUCCESS: {
            const castedAction: ReduxAction<GetFieldsSuccessPayload> = action;
            const incomingFields = castedAction.payload.fields.map(x => toLocalObject<FieldSchemaViewModel, string>(x, 'key'));
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
            const incomingAvailableFields = castedAction.payload.availableFields.map(x => toLocalObject<FieldValueProviderViewModel, string>(x, 'key'));
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
            const newField = [toLocalObject<FieldSchemaViewModel, string>(castedAction.payload.field, 'key')];
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
            const fieldsToBeCreated = castedAction.meta.offline.commit.meta.fields;
            const packagePath = castedAction.meta.offline.commit.meta.packagePath;
            newState.fields[packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[packagePath], fieldsToBeCreated);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.ADD_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, { fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string }> = action;
            const body = castedAction.payload.body;
            const newFields = (Array.isArray(body) ? body : [body]).map((newObject, index) => toLocalObject<FieldSchemaViewModel, string>(newObject, 'key', castedAction.meta.fields[index].localId, LocalObjectStatus.OK));
            newState.fields[castedAction.meta.packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[castedAction.meta.packagePath], newFields);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.ADD_FIELD_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Fields add error', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.UPDATE_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, { fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string }> = action;
            const body = castedAction.payload.body;
            const updatedFields = (Array.isArray(body) ? body : [body]).map((newObject, index) => toLocalObject<FieldSchemaViewModel, string>(newObject, 'key', castedAction.meta.fields[index].localId));
            newState.fields[castedAction.meta.packagePath] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.fields[castedAction.meta.packagePath], updatedFields);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.UPDATE_FIELD_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Fields update error', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.DELETE_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, { fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string }> = action;
            castedAction.meta.fields.forEach(field => {
                delete newState.fields[castedAction.meta.packagePath][field.localId];
            });
            return newState;
        }
        case prefix + DocumentRecordActionsBase.DELETE_FIELD_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Fields delete error', castedAction);
            return newState;
        }
        default:
            return {
                ...newState as any,
                ...recordReducersBase(state, action, prefix) as any
            }
    }
}
