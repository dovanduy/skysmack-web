import { AppState, ReduxAction } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { FILE_STORAGE_REDUX_KEY, FILE_STORAGE_REDUCER_KEY } from '../../constants/constants';
import { FileStorageActions } from './file-storage-actions';
import { GlobalProperties, StrIndex } from '@skysmack/framework';

/**
 * This is to be used when you want to access file-storage via the GLOBAL state. E.g. state.file-storage (where file-storage is the reducer name.)
 */
export class FileStorageAppState extends AppState {
    public fileStorage: FileStorageState;
}

export class FileStorageState {
    public settings: StrIndex<any> = {};
}

export function fileStorageReducer(state = new FileStorageState(), action: ReduxAction, prefix: string = FILE_STORAGE_REDUX_KEY): FileStorageState {
    state = sharedReducer(state, action, new FileStorageState(), FILE_STORAGE_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case FileStorageActions.GET_SETTINGS_SUCCESS: {
            const castedAction = action as { payload: { settings: any, packagePath: string } };
            newState.settings[castedAction.payload.packagePath] = castedAction.payload.settings;
            return newState;
        }
        case FileStorageActions.GET_SETTINGS_FAILURE: {
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', action);
            }
            return newState;
        }
        default:
            return state;
    }
}
