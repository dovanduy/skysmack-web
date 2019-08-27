import { NgFileStorageRequests } from './ng-file-storage-requests';
import { FILE_STORAGE_REDUX_KEY } from '@skysmack/packages-file-storage';
import { Injectable } from '@angular/core';
import { NgFileStorageNotifications } from '../ng-file-storage-notifications';
import { Epic } from 'redux-observable';


@Injectable({ providedIn: 'root' })
export class NgFileStorageEpics {
    public epics: Epic[];

    constructor(protected requests: NgFileStorageRequests, protected notifications: NgFileStorageNotifications) {
        this.epics = [];
    }
}
