import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FileStorageAppState, FILE_STORAGE_REDUX_KEY, FILE_STORAGE_ADDITIONAL_PATHS } from '@skysmack/packages-file-storage';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgFileStorageActions {
    constructor(protected store: NgRedux<FileStorageAppState>) { }
}
