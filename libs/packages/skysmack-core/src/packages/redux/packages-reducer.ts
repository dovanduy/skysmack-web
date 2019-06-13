import { LocalObject, Package, toLocalObject, HttpErrorResponse, AvailablePackage, StrIndex, LocalObjectExtensions, GlobalProperties, LocalPageTypes, HttpResponse, HttpSuccessResponse } from '@skysmack/framework';
import { AppState, ReduxAction, GetAvailablePackagesSuccessPayload, sharedReducer, recordReducersBase, RecordState, ReduxOfflineMeta, CommitMeta } from '@skysmack/redux';
import { PackagesActions } from './packages-actions';
import { PACKAGES_REDUCER_KEY, PACKAGES_REDUX_KEY } from '../constants';

/**
 * This is to be used when you want to access packages via the GLOBAL state. E.g. state.packages (where packages is the reducer name.)
 */
export class PackagesAppState extends AppState {
    public packages: PackagesState;
}

export class PackagesState implements RecordState<Package, string> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<string>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Package, string>>> = {};
    public availablePackages: StrIndex<StrIndex<LocalObject<AvailablePackage, string>>> = {};
}

export function packagesReducer(state = new PackagesState(), action: ReduxAction, prefix: string = PACKAGES_REDUX_KEY): PackagesState {
    state = sharedReducer(state, action, new PackagesState(), PACKAGES_REDUCER_KEY, ['localRecords', 'availablePackages']);
    const newState = Object.assign({}, state);

    switch (action.type) {

        case PackagesActions.GET_AVAILABLE_PACKAGES_SUCCESS: {
            const castedAction = action as ReduxAction<GetAvailablePackagesSuccessPayload>;
            const incomingAvailablePackages = castedAction.payload.availablePackages.map(x => toLocalObject<AvailablePackage, string>(x, 'type'));
            newState.availablePackages[castedAction.payload.stateKey] = LocalObjectExtensions.mergeOrAddLocal<AvailablePackage, string>(newState.availablePackages[castedAction.payload.stateKey], incomingAvailablePackages);
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_FAILURE: {
            const castedAction = action as ReduxAction<HttpErrorResponse>;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }

        case PackagesActions.EDIT_PACKAGE_PATH: {
            const castedAction = action as ReduxAction<unknown, ReduxOfflineMeta<LocalObject<Package, string>, HttpResponse, LocalObject<Package, string>>>;
            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const _package = castedAction.meta.offline.commit.meta.value;
            newState.localRecords[stateKey][_package.localId].object.path = _package.object.path;
            return newState;
        }
        case PackagesActions.EDIT_PACKAGE_PATH_SUCCESS: {
            const castedAction = action as ReduxAction<HttpSuccessResponse<string>, CommitMeta<LocalObject<Package, string>>>;
            const body = castedAction.payload.body;
            const stateKey = castedAction.meta.stateKey;
            const _package = castedAction.meta.value;
            newState.localRecords[stateKey][_package.localId].object.path = body;
            return newState;
        }
        case PackagesActions.EDIT_PACKAGE_PATH_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Edit package path error', action);
            }
            return newState;
        }

        default:
            return {
                ...state,
                ...recordReducersBase<PackagesState, Package, string>(state, action, prefix, 'path')
            };
    }
}
