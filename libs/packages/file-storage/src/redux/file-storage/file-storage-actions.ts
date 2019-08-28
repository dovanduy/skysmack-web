import { ReduxAction } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { FileStorageAppState } from './file-storage-reducer';
import { FILE_STORAGE_REDUX_KEY } from '../../constants/constants';

export class FileStorageActions {
    public static GET_BUCKET = 'GET_BUCKET';
    public static GET_BUCKET_SUCCESS = 'GET_BUCKET_SUCCESS';
    public static GET_BUCKET_FAILURE = 'GET_BUCKET_FAILURE';

    public static UPDATE_BUCKET = 'UPDATE_BUCKET';
    public static UPDATE_BUCKET_SUCCESS = 'UPDATE_BUCKET_SUCCESS';
    public static UPDATE_BUCKET_FAILURE = 'UPDATE_BUCKET_FAILURE';

    constructor(protected store: NgRedux<FileStorageAppState>) { }

    public getBucket = (packagePath: string) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: FILE_STORAGE_REDUX_KEY + FileStorageActions.GET_BUCKET,
            payload: { packagePath }
        })));
    }

    public updateBucket = (packagePath: string, settings: any) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: FILE_STORAGE_REDUX_KEY + FileStorageActions.UPDATE_BUCKET,
            payload: { packagePath, settings }
        })));
    }
}
