import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries, setConnectedParentPackage, getConnectedPackageMenuEntries } from '@skysmack/ng-framework';
import { LodgingsDoorwaysTypeId, LodgingsTypeId } from '@skysmack/package-types';
import { LodgingsDoorwaysIndexComponent } from './lodgings-doorways/components/lodgings-doorways-index/lodgings-doorways-index.component';
import { LodgingsIndexComponent } from '../lodgings/lodgings';
import { LodgingsPermissions } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private doorwayPassCodesTranslationPrefix = 'LODGINGS_DOORWAYS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                LodgingsDoorwaysTypeId,
                componentKey,
                LodgingsDoorwaysIndexComponent.COMPONENT_KEY,
                this.getLodgingsDoorwaysMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                LodgingsDoorwaysTypeId,
                componentKey,
                LodgingsDoorwaysIndexComponent.COMPONENT_KEY,
                this.getLodgingsDoorwaysMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                LodgingsDoorwaysTypeId,
                LodgingsTypeId,
                componentKey,
                LodgingsIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    //#region LodgingsDoorways
    private getLodgingsDoorwaysMenuAreas = () => {
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

    private getLodgingsDoorwaysMenuItems = (packagePath: string): MenuItem[] => {
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
                    LodgingsPermissions.addLodgings
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
    //#endregion
}