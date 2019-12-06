import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries, setConnectedParentPackage } from '@skysmack/ng-framework';
import { DoorwaysPassCodesTypeId } from '@skysmack/package-types';
import { DoorwaysPassCodesIndexComponent } from './doorways-pass-codes/components/doorways-pass-codes-index/doorways-pass-codes-index.component';
import { DoorwaysPassCodesPermissions } from '@skysmack/ng-doorways-pass-codes';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private doorwayPassCodesTranslationPrefix = 'DOORWAYS_PASS_CODES.INDEX.';

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
            )
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
            })
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
                    shiftKey: true,
                    action: `/${packagePath}/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    DoorwaysPassCodesPermissions.addDoorwaysPassCodes
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
    //#endregion
}