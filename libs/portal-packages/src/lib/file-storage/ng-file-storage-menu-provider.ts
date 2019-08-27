import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { FileStorageTypeId } from '@skysmack/package-types';
import { getMenuEntries } from '@skysmack/ng-framework';
import { FileStorageIndexComponent } from './file-storage/components/file-storage-index/file-storage-index.component';

@Injectable({ providedIn: 'root' })
export class NgFileStorageMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'FILE_STORAGE.INDEX.';

    constructor(
        private store: NgSkysmackStore
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
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    }

    private getFileStorageMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    // FileStoragePermissions.addFileStorage
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    // FileStoragePermissions.findFileStorageFields
                ],
                providedIn: [SIDEBAR]
            })
        ];
    }
}