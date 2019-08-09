import { StandardSettingsActions } from './standard-settings-actions';
import { Settings } from '@skysmack/framework';
import { sharedReducer } from '@skysmack/redux';

export class StandardSettingsState {
    public settings: Settings = {
        tenantUrl: ''
    };
}

export function standardSettingsReducer(state = new StandardSettingsState(), action: any) {
    state = sharedReducer(state, action, new StandardSettingsState(), 'standardSettings');
    const newState = Object.assign({}, state);

    switch (action.type) {
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
