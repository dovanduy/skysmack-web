import { GlobalProperties, LocalObject, toLocalObject } from '@skysmack/framework';
import { SettingsSuccessPayload } from '../payloads/settings-success-payload';
import { SettingsActions } from '../actions/settings-actions';
import { ReduxAction } from '../action-types/redux-action';
import { sharedReducer } from './shared-reducer';

/**
 * This is to be used when you want to access users via the GLOBAL state. E.g. state.users (where users is the reducer name.)
 */
export class SettingsAppState {
    [key: string]: LocalObject<any, unknown>;
}

export function settingsReducer(state = {}, action: ReduxAction): SettingsAppState {
    state = sharedReducer(state, action, {});
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SettingsActions.GET_SETTINGS_SUCCESS: {
            const castedAction = action as ReduxAction<SettingsSuccessPayload>;
            newState[castedAction.payload.packagePath] = toLocalObject(castedAction.payload.settings, 'none');
            return newState;
        }

        case SettingsActions.GET_SETTINGS_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        case SettingsActions.UPDATE_SETTINGS_SUCCESS: {
            try {
                const castedAction = action as ReduxAction<SettingsSuccessPayload>;
                newState[castedAction.payload.packagePath] = toLocalObject(castedAction.payload.settings, 'none');
                return newState;
            } catch (err) {
                console.log(err);
            }
        }

        case SettingsActions.UPDATE_SETTINGS_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        default:
            return state;
    }
}
