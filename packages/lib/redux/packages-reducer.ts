import { LocalObject, Package } from '@skysmack/framework';
import { AppState, ReduxAction } from '@skysmack/redux';
import { PackagesActions } from './packages-actions';

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

export function packagesReducer(state = new PackagesState(), action: ReduxAction): PackagesState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case PackagesActions.GET_PACKAGES_SUCCESS: {
            return newState;
        }
        case PackagesActions.GET_PACKAGES_FAILURE: {
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_SUCCESS: {
            return newState;
        }
        case PackagesActions.GET_AVAILABLE_PACKAGES_FAILURE: {
            return newState;
        }
        case PackagesActions.GET_SINGLE_PACKAGE_SUCCESS: {
            return newState;
        }
        case PackagesActions.GET_SINGLE_PACKAGE_FAILURE: {
            return newState;
        }
        case PackagesActions.ADD_PACKAGE: {
            return newState;
        }
        case PackagesActions.ADD_PACKAGE_SUCCESS: {
            return newState;
        }
        case PackagesActions.ADD_PACKAGE_FAILURE: {
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
