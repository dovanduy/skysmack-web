import { NgFileStorageRequests } from './ng-file-storage-requests';
import { FILE_STORAGE_REDUX_KEY } from '@skysmack/packages-file-storage';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgFileStorageNotifications } from '../ng-file-storage-notifications';


@Injectable({ providedIn: 'root' })
export class NgFileStorageEpics extends RecordEpicsBase<any, number> {
    constructor(protected requests: NgFileStorageRequests, protected notifications: NgFileStorageNotifications) {
        super(requests, FILE_STORAGE_REDUX_KEY, notifications);
    }
}
