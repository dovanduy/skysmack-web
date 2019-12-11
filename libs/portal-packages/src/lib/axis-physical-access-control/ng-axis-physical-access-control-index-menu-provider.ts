import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries, setConnectedParentPackage, getConnectedPackageMenuEntries } from '@skysmack/ng-framework';
import { DoorwaysTypeId, AxisPhysicalAccessControlTypeId } from '@skysmack/package-types';
import { AccessPointsIndexComponent } from './access-points/components/access-points-index/access-points-index.component';
import { DoorwaysIndexComponent } from '../doorways/doorways/components/doorways-index/doorways-index.component';
import { AccessPointsPermissions } from '@skysmack/ng-axis-physical-access-control';

@Injectable({ providedIn: 'root' })
export class NgAxisPhysicalAccessControlIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private accessPointsTranslationPrefix = 'ACCESS_POINTS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                AxisPhysicalAccessControlTypeId,
                componentKey,
                AccessPointsIndexComponent.COMPONENT_KEY,
                this.getAxisPhysicalAccessControlMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                AxisPhysicalAccessControlTypeId,
                componentKey,
                AccessPointsIndexComponent.COMPONENT_KEY,
                this.getAxisPhysicalAccessControlMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                AxisPhysicalAccessControlTypeId,
                DoorwaysTypeId,
                componentKey,
                DoorwaysIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    //#region AxisPhysicalAccessControl
    private getAxisPhysicalAccessControlMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.accessPointsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.accessPointsTranslationPrefix,
                order: 2
            }),
        ];
    };

    private getAxisPhysicalAccessControlMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.accessPointsTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    AccessPointsPermissions.addAccessPoints
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
    //#endregion
}