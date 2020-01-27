import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries, setConnectedParentPackage, getConnectedPackageMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { DoorwaysTypeId, AxisPhysicalAccessControlTypeId } from '@skysmack/package-types';
import { AccessPointsIndexComponent } from './access-points/components/access-points-index/access-points-index.component';
import { DoorwaysIndexComponent } from '../doorways/doorways/components/doorways-index/doorways-index.component';
import { AccessPointsPermissions } from '@skysmack/ng-axis-physical-access-control';
import { AxisPhysicalAccessControlIndexComponent } from './axis-physical-access-control/components/axis-physical-access-control-index/axis-physical-access-control-index.component';

@Injectable({ providedIn: 'root' })
export class NgAxisPhysicalAccessControlIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private axisPhysicalAccessControlTranslationPrefix = 'AXIS_PHYSICAL_ACCESS_CONTROL.INDEX.';
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
                AxisPhysicalAccessControlIndexComponent.COMPONENT_KEY,
                this.getAxisPhysicalAccessControlMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                AxisPhysicalAccessControlTypeId,
                componentKey,
                AccessPointsIndexComponent.COMPONENT_KEY,
                this.getAccessPointsMenuAreas,
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
                AxisPhysicalAccessControlIndexComponent.COMPONENT_KEY,
                this.getAxisPhysicalAccessControlMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                AxisPhysicalAccessControlTypeId,
                componentKey,
                AccessPointsIndexComponent.COMPONENT_KEY,
                this.getAccessPointsMenuItems,
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

    private getAxisPhysicalAccessControlMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.axisPhysicalAccessControlTranslationPrefix,
                order: 2
            }),
        ];
    };

    private getAxisPhysicalAccessControlMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'access-points',
                displayName: this.axisPhysicalAccessControlTranslationPrefix + 'ACCESS_POINTS',
                area: 'manage',
                order: 1,
                permissions: [
                    AccessPointsPermissions.findAccessPoints
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'settings/connection',
                displayName: this.axisPhysicalAccessControlTranslationPrefix + 'VAPIX_CONNECTION_SETTINGS',
                area: 'manage',
                order: 1,
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };

    //#region AccessPoints
    private getAccessPointsMenuAreas = () => {
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

    private getAccessPointsMenuItems = (packagePath: string): MenuItem[] => {
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
            setBackButton(packagePath)
        ];
    };
    //#endregion
}