import { AppState, ReduxAction } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { FILE_STORAGE_REDUX_KEY, FILE_STORAGE_REDUCER_KEY } from '../../constants/constants';
import { FileStorageActions } from './file-storage-actions';
import { GlobalProperties, StrIndex, HttpErrorResponse, PageResponse, LocalPageTypes, LocalObject, PageExtensions, LocalObjectExtensions, LoadingState, toLocalObject, HttpSuccessResponse } from '@skysmack/framework';
import { Bucket } from '../../models/bucket';
import { GetStorageItemsSuccessPayload, FileStorageItem, GetStorageItemsPayload } from '../../models';

/**
 * This is to be used when you want to access file-storage via the GLOBAL state. E.g. state.file-storage (where file-storage is the reducer name.)
 */
export class FileStorageAppState extends AppState {
    public fileStorage: FileStorageState;
}

export class FileStorageState {
    public buckets: StrIndex<Bucket> = {};
    public updatingBucket: StrIndex<boolean> = {};
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<string>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<FileStorageItem, string>>> = {};
}

export function fileStorageReducer(state = new FileStorageState(), action: ReduxAction, prefix: string = FILE_STORAGE_REDUX_KEY): FileStorageState {
    state = sharedReducer(state, action, new FileStorageState(), FILE_STORAGE_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        // BUCKET
        case prefix + FileStorageActions.GET_BUCKET_SUCCESS: {
            const castedAction = action as { payload: { bucket: Bucket, packagePath: string } };
            newState.buckets[castedAction.payload.packagePath] = castedAction.payload.bucket;
            return newState;
        }
        case prefix + FileStorageActions.GET_BUCKET_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action);
            }
            return newState;
        }
        case prefix + FileStorageActions.UPDATE_BUCKET: {
            newState.updatingBucket[(action.payload as { packagePath: string }).packagePath] = true;
            return newState;
        }
        case prefix + FileStorageActions.UPDATE_BUCKET_SUCCESS: {
            const castedAction = action as { payload: { bucket: any, packagePath: string } };
            newState.updatingBucket[castedAction.payload.packagePath] = false;
            newState.buckets[castedAction.payload.packagePath] = castedAction.payload.bucket;
            return newState;
        }
        case prefix + FileStorageActions.UPDATE_BUCKET_FAILURE: {
            console.log(action);
            newState.updatingBucket[(action.meta as { packagePath: string }).packagePath] = false;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action);
            }
            return newState;
        }

        // STORAGE ITEMS
        case prefix + FileStorageActions.GET_STORAGE_ITEMS: {
            const castedAction = action as ReduxAction<GetStorageItemsPayload>;
            const page = new PageResponse<string>({
                pageNumber: castedAction.payload.storageQuery.pageNumber,
                pageSize: castedAction.payload.storageQuery.pageSize,
                ids: [],
                links: null,
                query: castedAction.payload.storageQuery.query,
                sort: ''
            });
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPageStatus<string>(newState.localPageTypes[castedAction.payload.packagePath], page, LoadingState.Loading);

            return newState;
        }
        case prefix + FileStorageActions.GET_STORAGE_ITEMS_SUCCESS: {
            const castedAction = action as ReduxAction<GetStorageItemsSuccessPayload>;
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPage(newState.localPageTypes[castedAction.payload.packagePath], castedAction.payload.page);
            newState.localRecords[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[castedAction.payload.packagePath], castedAction.payload.entities.map(x => toLocalObject(x, 'selfLink')));

            return newState;
        }
        case prefix + FileStorageActions.GET_STORAGE_ITEMS_FAILURE: {
            const castedAction = action as ReduxAction<HttpErrorResponse>;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }

        case prefix + FileStorageActions.DELETE_SUCCESS: {
            const castedAction = action as ReduxAction<HttpSuccessResponse<FileStorageItem[] | FileStorageItem>, { value: LocalObject<FileStorageItem, string>[], stateKey: string }>;
            castedAction.meta.value.forEach(record => {
                delete newState.localRecords[castedAction.meta.stateKey][record.localId];
            });
            return newState;
        }
        case prefix + FileStorageActions.DELETE_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Delete error: ', action);
            }
            return newState;
        }

        default:
            return state;
    }
}