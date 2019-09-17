import { StorageQuery } from './storage-query';

export interface GetStorageItemsPayload {
    packagePath: string;
    storageQuery: StorageQuery;
}
