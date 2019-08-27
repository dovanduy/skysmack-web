import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { FILE_STORAGE_REDUX_KEY, FILE_STORAGE_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access file-storage via the GLOBAL state. E.g. state.file-storage (where file-storage is the reducer name.)
 */
export class FileStorageAppState extends AppState {
    public fileStorage: FileStorageState;
}

export class FileStorageState implements RecordState<any, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<any, number>>> = {};
}

export function fileStorageReducer(state = new FileStorageState(), action: ReduxAction, prefix: string = FILE_STORAGE_REDUX_KEY): FileStorageState {
    state = sharedReducer(state, action, new FileStorageState(), FILE_STORAGE_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<FileStorageState, any, number>(state, action, prefix)
            };
    }
}
