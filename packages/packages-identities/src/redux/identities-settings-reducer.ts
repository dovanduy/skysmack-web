import { StrIndex, GlobalProperties } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer } from '@skysmack/redux';
import { IdentitiesSettings } from '../models/identities-settings';
import { IdentitiesSettingsActions } from './identities-settings-actions';
import { IdentitiesSettingsSuccessPayload } from '../payloads/identities-settings-success-payload';

/**
 * This is to be used when you want to access users via the GLOBAL state. E.g. state.users (where users is the reducer name.)
 */
export class IdentitiesSettingsAppState extends AppState {
    public identitiesSettings: IdentitiesSettingsState;
}

export class IdentitiesSettingsState {
    public settings: StrIndex<IdentitiesSettings> = {};
}

export function identitiesSettingsReducer(state = new IdentitiesSettingsState(), action: ReduxAction): IdentitiesSettingsState {
    state = sharedReducer(state, action, new IdentitiesSettingsState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case IdentitiesSettingsActions.GET_IDENTITY_SETTINGS_SUCCESS: {
            const castedAction = action as ReduxAction<IdentitiesSettingsSuccessPayload>;
            newState.settings[castedAction.payload.packagePath] = castedAction.payload.settings;
            return newState;
        }

        case IdentitiesSettingsActions.GET_IDENTITY_SETTINGS_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        case IdentitiesSettingsActions.UPDATE_IDENTITY_SETTINGS_SUCCESS: {
            const castedAction = action as ReduxAction<IdentitiesSettingsSuccessPayload>;
            newState.settings[castedAction.payload.packagePath] = castedAction.payload.settings;
            return newState;
        }

        case IdentitiesSettingsActions.UPDATE_IDENTITY_SETTINGS_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        default:
            return state;
    }
}
