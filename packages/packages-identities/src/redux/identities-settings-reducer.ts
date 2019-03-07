import { StrIndex, GlobalProperties } from '@skysmack/framework';
import { AppState, ReduxAction, sharedReducer } from '@skysmack/redux';
import { UsersActions } from './users-actions';
import { IdentitiesSettings } from '../models/identities-settings';

/**
 * This is to be used when you want to access users via the GLOBAL state. E.g. state.users (where users is the reducer name.)
 */
export class IdentitiesSettingsAppState extends AppState {
    public identitiesSettings: IdentitiesSettingsState;
}

export class IdentitiesSettingsState {
    public settings: StrIndex<StrIndex<IdentitiesSettings>> = {};
}

export function identitiesSettingsReducer(state = new IdentitiesSettingsState(), action: ReduxAction): IdentitiesSettingsState {
    state = sharedReducer(state, action, new IdentitiesSettingsState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case UsersActions.GET_ROLES_SUCCESS: {
            return newState;
        }

        case UsersActions.GET_ROLES_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action.payload);
            }
            return state;
        }

        default:
            return state;
    }
}
