import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries, setConnectedParentPackage, getConnectedPackageMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { DoorwaysPassCodesTypeId, DoorwaysTypeId } from '@skysmack/package-types';
import { DoorwaysPassCodesIndexComponent } from './doorways-pass-codes/components/doorways-pass-codes-index/doorways-pass-codes-index.component';
import { DoorwaysIndexComponent } from '../doorways/doorways/components/doorways-index/doorways-index.component';
import { DoorwaysOptionsIndexComponent } from './doorways-options/components/doorways-options-index/doorways-options-index.component';
import { DoorwaysPermissions } from '@skysmack/ng-doorways';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private doorwayPassCodesTranslationPrefix = 'DOORWAYS_PASS_CODES.INDEX.';
    private doorwayOptionsTranslationPrefix = 'DOORWAYS_OPTIONS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                DoorwaysPassCodesTypeId,
                componentKey,
                DoorwaysPassCodesIndexComponent.COMPONENT_KEY,
                this.getDoorwaysPassCodesMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                DoorwaysPassCodesTypeId,
                componentKey,
                DoorwaysOptionsIndexComponent.COMPONENT_KEY,
                this.getDoorwaysOptionsMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                DoorwaysPassCodesTypeId,
                componentKey,
                DoorwaysPassCodesIndexComponent.COMPONENT_KEY,
                this.getDoorwaysPassCodesMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                DoorwaysPassCodesTypeId,
                DoorwaysTypeId,
                componentKey,
                DoorwaysIndexComponent.COMPONENT_KEY,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                DoorwaysPassCodesTypeId,
                componentKey,
                DoorwaysOptionsIndexComponent.COMPONENT_KEY,
                this.getDoorwaysOptionsMenuItems,
                this.store
            ),
        );
    };

    //#region DoorwaysPassCodes
    private getDoorwaysPassCodesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.doorwayPassCodesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.doorwayPassCodesTranslationPrefix,
                order: 2
            }),
        ];
    };

    private getDoorwaysPassCodesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.doorwayPassCodesTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
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
                url: 'options',
                displayName: this.doorwayPassCodesTranslationPrefix + 'OPTIONS',
                area: 'manage',
                order: 1,
                icon: 'add',
                permissions: [],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
    //#endregion

    //#region DoorwaysOptions
    private getDoorwaysOptionsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.doorwayOptionsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.doorwayOptionsTranslationPrefix,
                order: 2
            }),
        ];
    };

    private getDoorwaysOptionsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.doorwayOptionsTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
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
    };
    //#endregion
}