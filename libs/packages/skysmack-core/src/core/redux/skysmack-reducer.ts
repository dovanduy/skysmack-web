import { AppState, sharedReducer, ReduxAction } from '@skysmack/redux';
import { SkysmackActions } from './skysmack-actions';
import { StrIndex, HttpErrorResponse, GlobalProperties } from '@skysmack/framework';
import { SKYSMACK_REDUCER_KEY } from '../constants';
import { SkysmackRequestStatus } from '../models';

export class SkysmackAppState extends AppState {
    public skysmack: SkysmackState;
}

export class SkysmackState {
    public skysmack = {};
    public requestStatus: SkysmackRequestStatus;
    public permissions: StrIndex<string[]> = {};
    public availablePermissions: StrIndex<StrIndex<string>> = {};
}

export function skysmackReducer(state = new SkysmackState(), action: any): SkysmackState {
    state = sharedReducer(state, action, new SkysmackState(), SKYSMACK_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SkysmackActions.GET_SKYSMACK: {
            if (newState.requestStatus && newState.requestStatus.errorCode && (newState.requestStatus.errorCode == 0 || newState.requestStatus.errorCode >= 400)) {
                newState.requestStatus = undefined;
            }

            return newState;
        }
        case SkysmackActions.GET_SKYSMACK_SUCCESS: {
            newState.skysmack = action.payload;
            newState.requestStatus = new SkysmackRequestStatus({ errorCode: action.meta.response.status, error: action.meta.response.statusText });
            return newState;
        }
        case SkysmackActions.GET_SKYSMACK_FAILURE: {
            const castedAction = action as ReduxAction<HttpErrorResponse>;
            const errorCode = castedAction.payload.status;
            let errorDescription = 'Failed to get skysmack';
            let error = '';

            // Set errorDescription
            if (castedAction.payload.error && castedAction.payload.error.detail) {
                errorDescription = castedAction.payload.error.detail;
            } else if (castedAction.payload.message) {
                errorDescription = castedAction.payload.message;
            }

            // Set error
            if (errorCode === 0) {
                error = 'Connection Error'
            } else if (action.payload.error) {
                error = action.payload.error.title
            } else {
                error = errorCode === 0 ? 'Connection Error' : castedAction.payload.statusText
            }

            newState.requestStatus = new SkysmackRequestStatus({ errorCode, error, errorDescription });
            if (!GlobalProperties.production) {
                console.log('Error getting skysmack: ', castedAction);
            }
            return newState;
        }

        case SkysmackActions.GET_PACKAGE_PERMISSIONS_SUCCESS: {
            const castedAction = action as ReduxAction<string[], string>;
            newState.permissions[castedAction.meta] = castedAction.payload;
            return newState;
        }
        case SkysmackActions.GET_PACKAGE_PERMISSIONS_FAILURE: {
            const castedAction = action as ReduxAction<HttpErrorResponse>;
            if (!GlobalProperties.production) {
                console.log('Error getting permissions: ', castedAction);
            }
            return newState;
        }

        case SkysmackActions.GET_AVAILABLE_PACKAGE_PERMISSIONS_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<string>, string>;
            newState.availablePermissions[castedAction.meta] = castedAction.payload;
            return newState;
        }
        case SkysmackActions.GET_AVAILABLE_PACKAGE_PERMISSIONS_FAILURE: {
            const castedAction = action as ReduxAction<HttpErrorResponse>;
            if (!GlobalProperties.production) {
                console.log('Error getting available permissions: ', castedAction);
            }
            return newState;
        }

        default:
            return state;
    }
}
