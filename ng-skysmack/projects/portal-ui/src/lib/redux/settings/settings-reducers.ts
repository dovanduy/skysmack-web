import { SettingsActions } from './settings-actions';
import { Settings } from '@skysmack/ng-ui';

export interface SettingsState {
    settings: Settings;
}

export const SETTINGS_INITIAL_STATE: SettingsState = {
    settings: {
        language: 'en',
        tenantUrl: ''
    }
};

export function settingsReducer(state: SettingsState = SETTINGS_INITIAL_STATE, action: any) {
    let newState: SettingsState = SETTINGS_INITIAL_STATE;
    switch (action.type) {
        case SettingsActions.SET_LANGUAGE:
            return newState = {
                ...state,
                settings: {
                    ...state.settings,
                    language: action.payload
                } as Settings,
            };

        case SettingsActions.SET_TENANT_URL:
            return newState = {
                ...state,
                settings: {
                    ...state.settings,
                    tenantUrl: action.payload
                } as Settings,
            };

        default:
            return state;
    }
}
