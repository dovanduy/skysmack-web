import { LocalObject, Package, toLocalObject, HttpErrorResponse, ArrayHelpers, HttpSuccessResponse, AvailablePackage, StrIndex, IdentifiableExtensions } from '@skysmack/framework';
import { AppState, ReduxAction, GetAvailablePackagesSuccessPayload } from '@skysmack/redux';
import { PackagesActions } from './packages-actions';
import { GetPackagesSuccessPayload, GetPackageSuccessPayload } from '../payloads';

/**
 * This is to be used when you want to access packages via the GLOBAL state. E.g. state.packages (where packages is the reducer name.)
 */
export class PackagesAppState extends AppState {
    public packages: PackagesState;
}

export class PackagesState {
    public localPackages: StrIndex<LocalObject<Package, string>>;
    public availablePackages: StrIndex<LocalObject<AvailablePackage, string>>;
}

export function packagesReducer(state = new PackagesState(), action: any): PackagesState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case PackagesActions.GET_PACKAGES_SUCCESS: {
            const castedAction: ReduxAction<GetPackagesSuccessPayload> = action;
            const incomingPackages = castedAction.payload.packages.map(x => toLocalObject(x));
            newState.localPackages = IdentifiableExtensions.mergeOrAddLocal(newState.localPackages, incomingPackages);
            return newState;
        }
        case PackagesActions.GET_PACKAGES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Packages get error: ', castedAction);
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_SUCCESS: {
            const castedAction: ReduxAction<GetAvailablePackagesSuccessPayload> = action;
            const incomingAvailablePackages = castedAction.payload.availablePackages.map(x => toLocalObject(x));
            newState.availablePackages = IdentifiableExtensions.mergeOrAddLocal(newState.availablePackages, incomingAvailablePackages);
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Available packages get error: ', castedAction);
            return newState;
        }
        case PackagesActions.GET_SINGLE_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<GetPackageSuccessPayload> = action;
            const _newPackage = [toLocalObject(castedAction.payload._package)];
            newState.localPackages = IdentifiableExtensions.mergeOrAddLocal(newState.localPackages, _newPackage);
            return newState;
        }
        case PackagesActions.GET_SINGLE_PACKAGE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Get single package error: ', castedAction);
            return newState;
        }
        case PackagesActions.ADD_PACKAGE: {
            const castedAction: ReduxAction<any, any> = action;
            const packagesToBeCreated = castedAction.meta.offline.commit.meta.packages;
            newState.localPackages = IdentifiableExtensions.mergeOrAddLocal(newState.localPackages, packagesToBeCreated);
            return newState;
        }
        case PackagesActions.ADD_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, any> = action;
            const body = castedAction.payload.body;
            const newPackages = (Array.isArray(body) ? body : [body]).map((newObject, index) => toLocalObject(newObject, castedAction.meta.packages[index].localId));
            newState.localPackages = IdentifiableExtensions.mergeOrAddLocal(newState.localPackages, newPackages);
            return newState;
        }
        case PackagesActions.ADD_PACKAGE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Packages add error', castedAction);
            return newState;
        }
        case PackagesActions.UPDATE_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, any> = action;
            const body = castedAction.payload.body;
            const updatedPackages = (Array.isArray(body) ? body : [body]).map((newObject, index) => toLocalObject(newObject, castedAction.meta.packages[index].localId));
            newState.localPackages = IdentifiableExtensions.mergeOrAddLocal(newState.localPackages, updatedPackages);
            return newState;
        }
        case PackagesActions.UPDATE_PACKAGE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Packages update error', castedAction);
            return newState;
        }
        case PackagesActions.DELETE_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, { packages: LocalObject<Package, string>[] }> = action;
            castedAction.meta.packages.forEach(_package => {
                delete newState.localPackages[_package.object.path][_package.object.path];
            });
            return newState;
        }
        case PackagesActions.DELETE_PACKAGE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Packages delete error', castedAction);
            return newState;
        }
        default:
            return state;
    }
}
