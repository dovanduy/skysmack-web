import { GlobalProperties, toLocalObject, LocalObject } from '@skysmack/framework';
import { SettingsSuccessPayload } from '../payloads/settings-success-payload';
import { SettingsActions } from '../actions/settings-actions';
import { ReduxAction } from '../action-types/redux-action';
import { sharedReducer } from './shared-reducer';
import { SettingsCommitMeta } from '../metas/settings/settings-commit-meta';

export class SettingsAppState<TSettings> {
    [key: string]: TSettings;
}

export function settingsReducer<TSettings>(state = {}, action: ReduxAction): SettingsAppState<TSettings> {
    state = sharedReducer(state, action, {});
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SettingsActions.GET_SETTINGS_SUCCESS: {
            const castedAction = action as ReduxAction<SettingsSuccessPayload>;
            newState[castedAction.payload.packagePath] = {};
            newState[castedAction.payload.packagePath][castedAction.payload.settingsKey] = toLocalObject(castedAction.payload.settings, 'null');
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
                const castedAction = action as ReduxAction<any, SettingsCommitMeta<LocalObject<any, unknown>>>;
                newState[castedAction.meta.stateKey][castedAction.meta.settingsKey].object = castedAction.payload.body;
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
