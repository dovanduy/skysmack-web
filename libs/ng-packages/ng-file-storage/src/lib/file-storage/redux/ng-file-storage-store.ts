import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { FileStorageAppState, FILE_STORAGE_REDUCER_KEY } from '@skysmack/packages-file-storage';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgFileStorageStore {
    constructor(
        protected ngRedux: NgRedux<FileStorageAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }
}
