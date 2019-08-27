import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FileStorageAppState, FileStorageActions } from '@skysmack/packages-file-storage';

@Injectable({ providedIn: 'root' })
export class NgFileStorageActions extends FileStorageActions {
    constructor(protected store: NgRedux<FileStorageAppState>) {
        super(store);
    }
}
