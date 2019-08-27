import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Person, FileStorageAppState, FILE_STORAGE_REDUCER_KEY } from '@skysmack/packages-file-storage';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgFileStorageStore extends NgRecordStore<FileStorageAppState, Person, number> {
    constructor(
        protected ngRedux: NgRedux<FileStorageAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, FILE_STORAGE_REDUCER_KEY); }
}
