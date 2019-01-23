import { SettingsActions } from './settings-actions';
import { Settings } from '@skysmack/ng-ui';
import { sharedReducer } from '@skysmack/redux';

export class SettingsState {
    public settings: Settings = {
        language: 'en',
        tenantUrl: ''
    };
}

export function settingsReducer(state = new SettingsState(), action: any) {
    state = sharedReducer(state, action, new SettingsState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SettingsActions.SET_LANGUAGE: {
            newState.settings = {
                ...state.settings,
                language: action.payload
            } as Settings;

            return newState;
        }
        case SettingsActions.SET_TENANT_URL: {
            newState.settings = {
                ...state.settings,
                tenantUrl: action.payload
            } as Settings;
            return newState;
        }
        default:
            return state;
    }
}
