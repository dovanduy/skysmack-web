import { StandardSettingsActions } from './standard-settings-actions';
import { Settings } from '@skysmack/ng-ui';
import { sharedReducer } from '@skysmack/redux';

export class StandardSettingsState {
    public settings: Settings = {
        language: 'en',
        tenantUrl: ''
    };
}

export function standardSettingsReducer(state = new StandardSettingsState(), action: any) {
    state = sharedReducer(state, action, new StandardSettingsState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case StandardSettingsActions.SET_LANGUAGE: {
            newState.settings = {
                ...state.settings,
                language: action.payload
            } as Settings;

            return newState;
        }
        case StandardSettingsActions.SET_TENANT_URL: {
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
