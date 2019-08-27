import { ReduxAction } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { FileStorageAppState } from './file-storage-reducer';
import { FILE_STORAGE_REDUX_KEY } from '../../constants/constants';

export class FileStorageActions {
    public static GET_SETTINGS = 'GET_SETTINGS';
    public static GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
    public static GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

    constructor(protected store: NgRedux<FileStorageAppState>) { }

    public getSettings = (packagePath: string) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: FILE_STORAGE_REDUX_KEY + FileStorageActions.GET_SETTINGS,
            payload: { packagePath }
        })));
    }
}
