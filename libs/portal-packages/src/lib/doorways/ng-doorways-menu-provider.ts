import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { DoorwaysPermissions } from '@skysmack/ng-doorways';
import { DoorwaysTypeId } from '@skysmack/package-types';
import { getMenuEntries, getCombinedMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { DoorwaysIndexComponent } from './doorways/components/doorways-index/doorways-index.component';
import { DoorwayRelationsIndexComponent } from './doorway-relations/components/doorway-relations-index/doorway-relations-index.component';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'DOORWAYS.INDEX.';
    private doorwayRelationstranslationPrefix = 'DOORWAY_RELATIONS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, DoorwaysTypeId, componentKey, DoorwaysIndexComponent.COMPONENT_KEY, this.getDoorwaysMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, DoorwaysTypeId, componentKey, DoorwayRelationsIndexComponent.COMPONENT_KEY, this.getDoorwayRelationsMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, DoorwaysTypeId, componentKey, DoorwaysIndexComponent.COMPONENT_KEY, this.getDoorwaysMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, DoorwaysTypeId, componentKey, DoorwayRelationsIndexComponent.COMPONENT_KEY, this.getDoorwayRelationsMenuItems, this.store)
        );
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

    private getDoorwayRelationsMenuAreas = () => {
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
                url: `/${packagePath}/relations`,
                displayName: this.translationPrefix + 'RELATIONS',
                area: 'manage',
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
            }),
            new MenuItem({
                url: 'settings/relations',
                displayName: this.translationPrefix + 'DOORWAY_RELATION_SETTINGS',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [],
                providedIn: [SIDEBAR]
            }),
        ];
    }

    private getDoorwayRelationsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: `/${packagePath}/relations/create`,
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
            setBackButton(packagePath)
        ];
    }
}