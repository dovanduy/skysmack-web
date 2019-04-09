import { AppState, sharedReducer, ReduxAction } from '@skysmack/redux';
import { SkysmackActions } from './skysmack-actions';
import { StrIndex, HttpErrorResponse, GlobalProperties } from '@skysmack/framework';

export class SkysmackAppState extends AppState {
    public skysmack: SkysmackState;
}

export class SkysmackState {
    public skysmack = {};
    public tenantLoaded = false;
    public permissions = {}
}

export function skysmackReducer(state = new SkysmackState(), action: any): SkysmackState {
    state = sharedReducer(state, action, new SkysmackState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SkysmackActions.GET_SKYSMACK_SUCCESS: {
            newState.skysmack = action.payload;
            newState.tenantLoaded = true;
            return newState;
        }
        case SkysmackActions.GET_SKYSMACK_FAILURE: {
            newState.tenantLoaded = true;
            return newState;
        }

        case SkysmackActions.GET_PACKAGE_PERMISSIONS_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<string>, string>;
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

        default:
            return state;
    }
}
