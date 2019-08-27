import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FileStorageAppState, FILE_STORAGE_REDUX_KEY, FILE_STORAGE_ADDITIONAL_PATHS } from '@skysmack/packages-file-storage';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgFileStorageActions extends RecordActionsBase<FileStorageAppState, NgRedux<FileStorageAppState>> {
    constructor(protected store: NgRedux<FileStorageAppState>) { super(store, FILE_STORAGE_REDUX_KEY, FILE_STORAGE_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<any, number>): StrIndex<string> {
        return {
            displayName: record.object.displayName
        };
    }
}
