import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { DoorwaysPermissions } from '@skysmack/ng-doorways';
import { DoorwaysTypeId } from '@skysmack/package-types';
import { getMenuEntries } from '@skysmack/ng-framework';
import { DoorwaysIndexComponent } from './doorways/components/doorways-index/doorways-index.component';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'DOORWAYS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, DoorwaysTypeId, componentKey, DoorwaysIndexComponent.COMPONENT_KEY, this.getDoorwaysMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, DoorwaysTypeId, componentKey, DoorwaysIndexComponent.COMPONENT_KEY, this.getDoorwaysMenuItems, this.store);
    };

    private getDoorwaysMenuAreas = () => {
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

    private getDoorwaysMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: `/${packagePath}/create`,
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    DoorwaysPermissions.addDoorways
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: `/${packagePath}/fields`,
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                hotkeyOptions: {
                    keyCode: 70,
                    shiftKey: true,
                    action: `/${packagePath}/fields`
                },
                order: 2,
                icon: 'short_text',
                permissions: [
                    DoorwaysPermissions.findDoorwaysFields
                ],
                providedIn: [SIDEBAR]
            })
        ];
    }
}