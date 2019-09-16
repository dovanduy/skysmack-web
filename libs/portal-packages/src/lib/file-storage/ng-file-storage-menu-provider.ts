import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { FileStorageTypeId } from '@skysmack/package-types';
import { getMenuEntries } from '@skysmack/ng-framework';
import { FileStorageIndexComponent } from './file-storage/components/file-storage-index/file-storage-index.component';
import { MatDialog } from '@angular/material/dialog';
import { FileStorageUploadComponent } from './file-storage/components/file-storage-upload/file-storage-upload.component';

@Injectable({ providedIn: 'root' })
export class NgFileStorageMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'FILE_STORAGE.INDEX.';

    constructor(
        private store: NgSkysmackStore,
        private dialog: MatDialog
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, FileStorageTypeId, componentKey, FileStorageIndexComponent.COMPONENT_KEY, this.getFileStorageMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, FileStorageTypeId, componentKey, FileStorageIndexComponent.COMPONENT_KEY, this.getFileStorageMenuItems, this.store);
    };

    private getFileStorageMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ];
    }

    private getFileStorageMenuItems = () => {
        return [
            new MenuItem({
                area: 'actions',
                order: 1,
                permissions: [],
                providedIn: [SPEEDDIAL]
            }).asEventAction(this.translationPrefix + 'UPLOAD', (_this: NgFileStorageMenuProvider) => {
                _this.dialog.open(FileStorageUploadComponent);
            }, 'add', this),
            new MenuItem({
                area: 'actions',
                order: 2,
                permissions: [],
                providedIn: [SPEEDDIAL]
            }).asEventAction(this.translationPrefix + 'CREATE_FOLDER', (_this: NgFileStorageMenuProvider) => {
                _this.dialog.open(FileStorageUploadComponent);
            }, 'create_new_folder', this),
        ];
    }
}