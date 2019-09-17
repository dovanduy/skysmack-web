import { FileStorageItem } from './file-storage-item';
import { PageResponse } from '@skysmack/framework';
import { StorageQuery } from './storage-query';

export interface GetStorageItemsSuccessPayload {
    entities: FileStorageItem[];
    packagePath: string;
    page: PageResponse<string>;
    storageQuery: StorageQuery;
}