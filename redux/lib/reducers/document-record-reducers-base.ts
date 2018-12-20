import { DocumentRecordActionsBase } from "../actions";
import { Record, toLocalObject, ArrayHelpers, HttpSuccessResponse, LocalObject, FieldSchemaViewModel, HttpErrorResponse, LocalObjectStatus } from "@skysmack/framework";
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
            newState.fields[castedAction.payload.packagePath] = castedAction.payload.fields.map(x => toLocalObject(x));
            const incomingFields = castedAction.payload.fields.map(x => toLocalObject(x).setObjectIdentifier('key'));
            newState.fields[castedAction.payload.packagePath] = ArrayHelpers.mergeLocalObjectArraysImmutable(newState.fields[castedAction.payload.packagePath], incomingFields, 'object.key');
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_FIELDS_FAILURE: {
            const castedAction: ReduxAction<PackagePathPayload> = action;
            console.log('Fields failure. Error Action:', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS_SUCCESS: {
            const castedAction: ReduxAction<GetAvailableFieldsSuccessPayload> = action;
            const incomingAvailableFields = castedAction.payload.availableFields.map(x => toLocalObject(x).setObjectIdentifier('key'));
            const localAvailableFields = newState.availableFields[castedAction.payload.packagePath] ? newState.availableFields[castedAction.payload.packagePath] : [];
            newState.availableFields[castedAction.payload.packagePath] = ArrayHelpers.mergeLocalObjectArraysImmutable(localAvailableFields, incomingAvailableFields, 'object.key');
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Available fields get error: ', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.GET_SINGLE_FIELD_SUCCESS: {
            const castedAction: ReduxAction<GetSingleFieldSuccessPayload> = action;
            const newField = [toLocalObject(castedAction.payload.field).setObjectIdentifier('key')];
            const localFields = newState.fields[castedAction.payload.packagePath] ? newState.fields[castedAction.payload.packagePath] : [];
            newState.fields[castedAction.payload.packagePath] = ArrayHelpers.mergeLocalObjectArraysImmutable(localFields, newField, 'object.key');
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
            const localFields = newState.fields[packagePath] ? newState.fields[packagePath] : [];
            newState.fields[packagePath] = ArrayHelpers.mergeLocalObjectArraysImmutable(localFields, fieldsToBeCreated, 'object.key');
            return newState;
        }
        case prefix + DocumentRecordActionsBase.ADD_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, { fields: LocalObject<FieldSchemaViewModel>[], packagePath: string }> = action;
            const body = castedAction.payload.body;
            const newFields = (Array.isArray(body) ? body : [body]).map((newObject, index) => toLocalObject(newObject, castedAction.meta.fields[index].localId, LocalObjectStatus.OK));
            const localFields = newState.fields[castedAction.meta.packagePath] ? newState.fields[castedAction.meta.packagePath] : [];
            newState.fields[castedAction.meta.packagePath] = ArrayHelpers.mergeLocalObjectArraysImmutable(localFields, newFields, 'object.key');
            return newState;
        }
        case prefix + DocumentRecordActionsBase.ADD_FIELD_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Fields add error', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.UPDATE_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, { fields: LocalObject<FieldSchemaViewModel>[], packagePath: string }> = action;
            const body = castedAction.payload.body;
            const updatedFields = (Array.isArray(body) ? body : [body]).map((newObject, index) => toLocalObject(newObject, castedAction.meta.fields[index].localId));
            const localFields = newState.fields[castedAction.meta.packagePath] ? newState.fields[castedAction.meta.packagePath] : [];
            newState.fields[castedAction.meta.packagePath] = ArrayHelpers.mergeLocalObjectArraysImmutable(localFields, updatedFields, 'object.key');
            return newState;
        }
        case prefix + DocumentRecordActionsBase.UPDATE_FIELD_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Fields update error', castedAction);
            return newState;
        }
        case prefix + DocumentRecordActionsBase.DELETE_FIELD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, { fields: LocalObject<FieldSchemaViewModel>[], packagePath: string }> = action;
            // Foreach field, filter the newstate fields for that key.
            const localFields = newState.fields[castedAction.meta.packagePath] ? newState.fields[castedAction.meta.packagePath] : [];
            castedAction.meta.fields.forEach(field => {
                newState.fields[castedAction.meta.packagePath] = localFields.filter(_field => _field.object.key !== field.object.key);
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
