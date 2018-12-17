import { LocalObject, Package, toLocalObject, HttpErrorResponse, ArrayHelpers, HttpSuccessResponse } from '@skysmack/framework';
import { AppState, ReduxAction } from '@skysmack/redux';
import { PackagesActions } from './packages-actions';
import { GetPackagesSuccessPayload } from '../payloads';

/**
 * This is to be used when you want to access packages via the GLOBAL state. E.g. state.packages (where packages is the reducer name.)
 */
export class PackagesAppState extends AppState {
    public packages: PackagesState;
}

export class PackagesState {
    public localPackages: LocalObject<Package>[] = [];
    public availablePackages: LocalObject<Package>[] = [];
}

export function packagesReducer(state = new PackagesState(), action: any): PackagesState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case PackagesActions.GET_PACKAGES_SUCCESS: {
            const castedAction: ReduxAction<GetPackagesSuccessPayload> = action;
            const incomingPackages = castedAction.payload.packages.map(x => toLocalObject(x).setObjectIdentifier('path'));
            newState.localPackages = ArrayHelpers.mergeLocalObjectArraysImmutable(newState.localPackages, incomingPackages);
            return newState;
        }
        case PackagesActions.GET_PACKAGES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Packages get error: ', castedAction);
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_SUCCESS: {
            const castedAction: ReduxAction<GetPackagesSuccessPayload> = action;
            const incomingAvailablePackages = castedAction.payload.packages.map(x => toLocalObject(x).setObjectIdentifier('path'));
            newState.availablePackages = ArrayHelpers.mergeLocalObjectArraysImmutable(newState.availablePackages, incomingAvailablePackages);
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Available packages get error: ', castedAction);
            return newState;
        }
        case PackagesActions.GET_SINGLE_PACKAGE_SUCCESS: {
            return newState;
        }
        case PackagesActions.GET_SINGLE_PACKAGE_FAILURE: {
            return newState;
        }
        case PackagesActions.ADD_PACKAGE: {
            const castedAction: ReduxAction<any, any> = action;
            console.log(castedAction);
            const packagesToBeCreated = castedAction.meta.offline.commit.meta.packages;
            newState.localPackages = ArrayHelpers.mergeLocalObjectArraysImmutable(newState.localPackages, packagesToBeCreated);
            return newState;
        }
        case PackagesActions.ADD_PACKAGE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, any> = action;
            const body = castedAction.payload.body;
            const newObjects = (Array.isArray(body) ? body : [body]).map((newObject, index) => toLocalObject(newObject, castedAction.meta.packages[index].localId));
            newState.localPackages = ArrayHelpers.mergeLocalObjectArraysImmutable(newState.localPackages, newObjects);
            return newState;
        }
        case PackagesActions.ADD_PACKAGE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Packages add error', castedAction);
            return newState;
        }
        case PackagesActions.UPDATE_PACKAGE_SUCCESS: {
            return newState;
        }
        case PackagesActions.UPDATE_PACKAGE_FAILURE: {
            return newState;
        }
        case PackagesActions.DELETE_PACKAGE_SUCCESS: {
            return newState;
        }
        case PackagesActions.DELETE_PACKAGE_FAILURE: {
            return newState;
        }
        default:
            return state;
    }
}
