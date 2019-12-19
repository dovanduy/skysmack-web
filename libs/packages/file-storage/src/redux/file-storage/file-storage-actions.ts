import { ReduxAction, EffectRequest, Effect } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { FileStorageAppState } from './file-storage-reducer';
import { FILE_STORAGE_REDUX_KEY } from '../../constants/constants';
import { StorageQuery } from '../../models/storage-query';
import { GetStorageItemsPayload } from '../../models/get-storage-items-payload';
import { LocalObject, HttpMethod, LocalObjectStatus } from '@skysmack/framework';
import { FileStorageItem } from '../../models/file-storage-item';

export class FileStorageActions {
    public static GET_STORAGE_ITEMS = 'GET_STORAGE_ITEMS';
    public static GET_STORAGE_ITEMS_SUCCESS = 'GET_STORAGE_ITEMS_SUCCESS';
    public static GET_STORAGE_ITEMS_FAILURE = 'GET_STORAGE_ITEMS_FAILURE';

    public static GET_BUCKET = 'GET_BUCKET';
    public static GET_BUCKET_SUCCESS = 'GET_BUCKET_SUCCESS';
    public static GET_BUCKET_FAILURE = 'GET_BUCKET_FAILURE';

    public static UPDATE_BUCKET = 'UPDATE_BUCKET';
    public static UPDATE_BUCKET_SUCCESS = 'UPDATE_BUCKET_SUCCESS';
    public static UPDATE_BUCKET_FAILURE = 'UPDATE_BUCKET_FAILURE';

    public static DELETE = 'DELETE';
    public static DELETE_SUCCESS = 'DELETE_SUCCESS';
    public static DELETE_FAILURE = 'DELETE_FAILURE';

    constructor(protected store: NgRedux<FileStorageAppState>) { }

    public getStorageItems = (packagePath: string, storageQuery: StorageQuery) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetStorageItemsPayload>({
            type: FILE_STORAGE_REDUX_KEY + FileStorageActions.GET_STORAGE_ITEMS,
            payload: {
                storageQuery,
                packagePath
            }
        })));
    }

    public getBucket = (packagePath: string) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: FILE_STORAGE_REDUX_KEY + FileStorageActions.GET_BUCKET,
            payload: { packagePath }
        })));
    }

    public updateBucket = (packagePath: string, bucket: any) => {
        this.store.dispatch(Object.assign({}, new ReduxAction<any>({
            type: FILE_STORAGE_REDUX_KEY + FileStorageActions.UPDATE_BUCKET,
            payload: { packagePath, bucket }
        })));
    }

    public delete = (records: LocalObject<FileStorageItem, string>[], packagePath: string) => {
        const fileNames = records.map(record => `fileNames=${record.object.name}`).join('&');
        const path = `${packagePath}?${fileNames}`;

        records.forEach(record => record.error = false);

        // TODO: Enable queue?
        // const queueItems = records.map(record => {
        //     const withQueue = FILE_STORAGE_REDUX_KEY + 'QUEUE';
        //     return new QueueItem({
        //         message: `${withQueue.replace('_QUEUE', '.QUEUE')}.DELETING`,
        //         messageParams: this.getMessageParams(record),
        //         packagePath,
        //         localObject: record,
        //         cancelAction: this.cancelAction,
        //         deleteAction: this.delete
        //     });
        // });

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: FILE_STORAGE_REDUX_KEY + FileStorageActions.DELETE,
            meta: {
                offline: {
                    effect: new Effect<FileStorageItem[]>(new EffectRequest<FileStorageItem[]>(
                        path,
                        HttpMethod.DELETE,
                        records.map(x => {
                            x.status = LocalObjectStatus.DELETING
                            return x.object
                        }),
                    )),
                    commit: new ReduxAction<any, { stateKey: string; value: LocalObject<FileStorageItem, string>[] }>({
                        type: FILE_STORAGE_REDUX_KEY + FileStorageActions.DELETE_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: records
                        }
                    }),
                    rollback: new ReduxAction<any, { stateKey: string; value: LocalObject<FileStorageItem, string>[] }>({
                        type: FILE_STORAGE_REDUX_KEY + FileStorageActions.DELETE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: records,
                        }
                    })
                }
            }
        })));
    }
}
