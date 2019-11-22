import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { PassCodesPermissions } from '@skysmack/packages-pass-codes';
import { PassCodesTypeId } from '@skysmack/package-types';
import { getMenuEntries } from '@skysmack/ng-framework';
import { PassCodesIndexComponent } from './pass-codes/components/pass-codes-index/pass-codes-index.component';

@Injectable({ providedIn: 'root' })
export class NgPassCodesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'PASS_CODES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, PassCodesTypeId, componentKey, PassCodesIndexComponent.COMPONENT_KEY, this.getPassCodesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, PassCodesTypeId, componentKey, PassCodesIndexComponent.COMPONENT_KEY, this.getPassCodesMenuItems, this.store);
    };

    private getPassCodesMenuAreas = () => {
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

    private getPassCodesMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    PassCodesPermissions.addPassCodes
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
                    PassCodesPermissions.findPassCodesFields
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'settings',
                displayName: this.translationPrefix + 'SETTINGS',
                area: 'manage',
                order: 1,
                icon: 'add',
                permissions: [],
                providedIn: [SIDEBAR]
            })
        ];
    }
}