import { LocalObject, Package, toLocalObject, HttpErrorResponse, HttpSuccessResponse, AvailablePackage, StrIndex, LocalObjectExtensions, replaceLocalInnerObject, GlobalProperties, Record, PageResponse, PageExtensions, LoadingState, LocalPageTypes } from '@skysmack/framework';
import { AppState, ReduxAction, GetAvailablePackagesSuccessPayload, sharedReducer, RollbackMeta, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload } from '@skysmack/redux';
import { PackagesActions } from './packages-actions';
import { GetPackagesSuccessPayload, GetPackageSuccessPayload } from '../payloads';
import { cancelPackageAction } from './cancel-package-action';

/**
 * This is to be used when you want to access packages via the GLOBAL state. E.g. state.packages (where packages is the reducer name.)
 */
export class PackagesAppState extends AppState {
    public packages: PackagesState;
}

export class PackagesState {
    public localPageTypes: StrIndex<LocalPageTypes<string>> = {};
    public packages: StrIndex<LocalObject<Package, string>> = {};
    public availablePackages: StrIndex<LocalObject<AvailablePackage, string>> = {};
}

export function packagesReducer(state = new PackagesState(), action: any): PackagesState {
    state = sharedReducer(state, action, new PackagesState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case PackagesActions.CANCEL_PACKAGE_ACTION: {
            return cancelPackageAction(newState, action);
        }
        case PackagesActions.PACKAGES_GET_PAGED: {
            const castedAction: ReduxAction<GetPagedEntitiesPayload> = action;
            const page = new PageResponse<string>({
                pageNumber: castedAction.payload.pagedQuery.pageNumber,
                pageSize: castedAction.payload.pagedQuery.pageSize,
                ids: [],
                links: null,
                query: castedAction.payload.pagedQuery.rsqlFilter.toList().build(),
                sort: castedAction.payload.pagedQuery.sort.build()
            });
            newState.localPageTypes = PageExtensions.mergeOrAddPage(newState.localPageTypes, page, LoadingState.Loading);
            return newState;
        }
        case PackagesActions.PACKAGES_GET_PAGED_SUCCESS: {
            const castedAction: ReduxAction<GetPagedEntitiesSuccessPayload<Package, string>> = action;
            newState.localPageTypes = PageExtensions.mergeOrAddPage(newState.localPageTypes, castedAction.payload.page);
            newState.packages = LocalObjectExtensions.mergeOrAddLocal(newState.packages, castedAction.payload.entities.map(x => toLocalObject(x, 'path')));
            return newState;
        }
        case PackagesActions.PACKAGES_GET_PAGED_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case PackagesActions.GET_PACKAGES_SUCCESS: {
            const castedAction: ReduxAction<GetPackagesSuccessPayload> = action;
            const incomingPackages = castedAction.payload.packages.map(x => toLocalObject<Package, string>(x, 'path'));
            newState.packages = LocalObjectExtensions.mergeOrAddLocal<AvailablePackage, string>(newState.packages, incomingPackages);
            return newState;
        }
        case PackagesActions.GET_PACKAGES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case PackagesActions.GET_SINGLE_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<GetPackageSuccessPayload> = action;
            const _newPackage = [toLocalObject<Package, string>(castedAction.payload._package, 'path')];
            newState.packages = LocalObjectExtensions.mergeOrAddLocal<Package, string>(newState.packages, _newPackage);
            return newState;
        }
        case PackagesActions.GET_SINGLE_PACKAGE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_SUCCESS: {
            const castedAction: ReduxAction<GetAvailablePackagesSuccessPayload> = action;
            const incomingAvailablePackages = castedAction.payload.availablePackages.map(x => toLocalObject<AvailablePackage, string>(x, 'type'));
            newState.availablePackages = LocalObjectExtensions.mergeOrAddLocal<AvailablePackage, string>(newState.availablePackages, incomingAvailablePackages);
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case PackagesActions.ADD_PACKAGE: {
            const castedAction: ReduxAction<any, any> = action;
            const packagesToBeCreated = castedAction.meta.offline.commit.meta.value;
            newState.packages = LocalObjectExtensions.mergeOrAddLocal<Package, string>(newState.packages, packagesToBeCreated);
            return newState;
        }
        case PackagesActions.ADD_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<Package[] | Package>, any> = action;
            const body = castedAction.payload.body;
            const newPackages = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject<Package, string>(castedAction.meta.value[index], newObject));
            newState.packages = LocalObjectExtensions.mergeOrAddLocal<Package, string>(newState.packages, newPackages);
            return newState;
        }
        case PackagesActions.ADD_PACKAGE_FAILURE: {
            setActionError(action, 'Add error: ');
            return newState;
        }
        case PackagesActions.UPDATE_PACKAGE: {
            const castedAction: ReduxAction<any, any> = action;
            const packagesToBeUpdated = castedAction.meta.offline.commit.meta.value;
            newState.packages = LocalObjectExtensions.mergeOrAddLocal<Package, string>(newState.packages, packagesToBeUpdated);
            return newState;
        }
        case PackagesActions.UPDATE_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<Package[] | Package>, any> = action;
            const body = castedAction.payload.body;
            const updatedPackages = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject<Package, string>(castedAction.meta.value[index], newObject));
            newState.packages = LocalObjectExtensions.mergeOrAddLocal<AvailablePackage, string>(newState.packages, updatedPackages);
            return newState;
        }
        case PackagesActions.UPDATE_PACKAGE_FAILURE: {
            setActionError(action, 'Update error: ');
            return newState;
        }
        case PackagesActions.DELETE_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<Package[] | Package>, { value: LocalObject<Package, string>[] }> = action;
            castedAction.meta.value.forEach(_package => {
                delete newState.packages[_package.object.path][_package.object.path];
            });
            return newState;
        }
        case PackagesActions.DELETE_PACKAGE_FAILURE: {
            setActionError(action, 'Delete error: ');
            return newState;
        }
        default:
            return state;
    }
}

function setActionError<TRecord extends Record<TKey>, TKey>(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<TRecord, TKey>[]>>, message: string = 'Error: '): void {
    action.meta.value.forEach(record => {
        record.error = true;
    });
    if (!GlobalProperties.production) {
        console.log(message, action);
    }
}