import { toLocalObject, HttpSuccessResponse, LocalObject, HttpErrorResponse, LocalObjectExtensions, replaceLocalInnerObject, GlobalProperties, PageResponse, PageExtensions, LoadingState, HttpResponse, FieldSchemaViewModel, LocalObjectStatus, FieldValueProviderViewModel, LocalPageTypes, StrIndex, getFieldStateKey } from "@skysmack/framework";
import { ReduxAction } from '../action-types/redux-action';
import { GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload, GetAvailableFieldsSuccessPayload } from './../payloads';
import { cancelFieldAction } from './cancel-field-action';
import { FieldActions } from '../actions/field-actions';
import { ReduxOfflineMeta } from '../metas/offline-redux/redux-offline-meta';
import { CommitMeta } from '../metas/offline-redux/commit-meta';
import { RollbackMeta } from '../metas/offline-redux/rollback-meta';
import { sharedReducer } from './shared-reducer';
import { AppState } from '../states/app-state';
import { AdditionalPathsMeta } from '../metas';

export class FieldsAppState extends AppState {
    public fields: FieldState;
}

export class FieldState {
    localPageTypes: StrIndex<StrIndex<LocalPageTypes<string>>> = {};
    localRecords: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>> = {};
    availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>> = {};
}

export function fieldReducer(state: FieldState = new FieldState(), action: any): FieldState {
    state = sharedReducer(state, action, new FieldState(), 'fields');
    let newState = Object.assign({}, state);

    switch (action.type) {
        case FieldActions.CANCEL_FIELD_ACTION: {
            return cancelFieldAction(newState, action);
        }
        case FieldActions.FIELD_GET_PAGED: {
            const castedAction: ReduxAction<GetPagedEntitiesPayload, AdditionalPathsMeta> = action;
            const stateKey = getFieldStateKey(castedAction.payload.packagePath, castedAction.meta.additionalPaths);
            const page = new PageResponse<string>({
                pageNumber: castedAction.payload.pagedQuery.pageNumber,
                pageSize: castedAction.payload.pagedQuery.pageSize,
                ids: [],
                links: null,
                query: castedAction.payload.pagedQuery.rsqlFilter.toList().build(),
                sort: castedAction.payload.pagedQuery.sort.build()
            });
            newState.localPageTypes[stateKey] = PageExtensions.mergeOrAddPage(newState.localPageTypes[stateKey], page, LoadingState.Loading);
            return newState;
        }
        case FieldActions.FIELD_GET_PAGED_SUCCESS: {
            const castedAction: ReduxAction<GetPagedEntitiesSuccessPayload<FieldSchemaViewModel, string>, AdditionalPathsMeta> = action;
            const stateKey = getFieldStateKey(castedAction.payload.packagePath, castedAction.meta.additionalPaths);
            newState.localPageTypes[stateKey] = PageExtensions.mergeOrAddPage(newState.localPageTypes[stateKey], castedAction.payload.page);

            newState.localRecords[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[stateKey], castedAction.payload.entities.map(x => toLocalObject(x, 'key')));

            return newState;
        }
        case FieldActions.FIELD_GET_PAGED_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case FieldActions.FIELD_GET_SINGLE_SUCCESS: {
            const castedAction: ReduxAction<GetSingleEntitySuccessPayload<FieldSchemaViewModel, string>, AdditionalPathsMeta> = action;
            const stateKey = getFieldStateKey(castedAction.payload.packagePath, castedAction.meta.additionalPaths);
            newState.localRecords[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[stateKey], [toLocalObject(castedAction.payload.entity, 'key')], undefined, true);
            return newState;
        }
        case FieldActions.FIELD_GET_SINGLE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case FieldActions.FIELD_GET_AVAILABLE_FIELDS_SUCCESS: {
            const castedAction: ReduxAction<GetAvailableFieldsSuccessPayload, AdditionalPathsMeta> = action;
            const stateKey = getFieldStateKey(castedAction.payload.packagePath, castedAction.meta.additionalPaths);
            const incomingAvailableFields = castedAction.payload.availableFields.map(x => toLocalObject<FieldValueProviderViewModel, string>(x, 'name'));
            newState.availableFields[stateKey] = LocalObjectExtensions.mergeOrAddLocal<FieldValueProviderViewModel, string>(newState.availableFields[stateKey], incomingAvailableFields);
            return newState;
        }
        case FieldActions.FIELD_GET_AVAILABLE_FIELDS_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case FieldActions.FIELD_ADD: {
            const castedAction: ReduxAction<null, ReduxOfflineMeta<FieldSchemaViewModel[], HttpResponse, LocalObject<FieldSchemaViewModel, string>[]>> = action;
            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const recordsToBeCreated = castedAction.meta.offline.commit.meta.value;
            newState.localRecords[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[stateKey], recordsToBeCreated);
            return newState;
        }
        case FieldActions.FIELD_ADD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<FieldSchemaViewModel[]>, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>> = action;
            const body = castedAction.payload.body;
            const newObjects = body.map((newObject, index) => replaceLocalInnerObject(castedAction.meta.value[index], newObject));
            newState.localRecords[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.localRecords[castedAction.meta.stateKey], newObjects);
            return newState;
        }
        case FieldActions.FIELD_ADD_FAILURE: {
            setActionError(action, 'Add error: ');
            return newState;
        }
        case FieldActions.FIELD_UPDATE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<FieldSchemaViewModel[]>, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>> = action;
            const body = castedAction.payload.body;
            const updatedObjects = body.map((newObject, index) => replaceLocalInnerObject(castedAction.meta.value[index], newObject));
            newState.localRecords[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<FieldSchemaViewModel, string>(newState.localRecords[castedAction.meta.stateKey], updatedObjects);
            return newState;
        }
        case FieldActions.FIELD_UPDATE_FAILURE: {
            setActionError(action, 'Update error: ');
            return newState;
        }
        case FieldActions.FIELD_DELETE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<FieldSchemaViewModel[] | FieldSchemaViewModel>, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>> = action;
            castedAction.meta.value.forEach(record => {
                delete newState.localRecords[castedAction.meta.stateKey][record.localId];
            });
            return newState;
        }
        case FieldActions.FIELD_DELETE_FAILURE: {
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
            record.object.key = '';
        }
    });
    if (!GlobalProperties.production) {
        console.log(message, action);
    }
}
