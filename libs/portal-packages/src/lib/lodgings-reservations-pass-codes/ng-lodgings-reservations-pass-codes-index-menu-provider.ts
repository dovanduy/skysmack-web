import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries, setConnectedParentPackage, getConnectedPackageMenuEntries } from '@skysmack/ng-framework';
import { LodgingsReservationsPassCodesTypeId, LodgingReservationsTypeId } from '@skysmack/package-types';
import { LodgingsReservationsPassCodesIndexComponent } from './lodgings-reservations-pass-codes/components/lodgings-reservations-pass-codes-index/lodgings-reservations-pass-codes-index.component';
import { LodgingsReservationsIndexComponent } from '../lodging-reservations/lodging-reservations/lodgings-reservations-index/lodgings-reservations-index.component';
import { ReservationsPermissions } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsPassCodesIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private doorwayPassCodesTranslationPrefix = 'LODGINGS_RESERVATIONS_PASS_CODES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                LodgingsReservationsPassCodesTypeId,
                componentKey,
                LodgingsReservationsPassCodesIndexComponent.COMPONENT_KEY,
                this.getLodgingsReservationsPassCodesMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                LodgingsReservationsPassCodesTypeId,
                componentKey,
                LodgingsReservationsPassCodesIndexComponent.COMPONENT_KEY,
                this.getLodgingsReservationsPassCodesMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                LodgingsReservationsPassCodesTypeId,
                LodgingReservationsTypeId,
                componentKey,
                LodgingsReservationsIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    //#region LodgingsReservationsPassCodes
    private getLodgingsReservationsPassCodesMenuAreas = () => {
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

    private getLodgingsReservationsPassCodesMenuItems = (packagePath: string): MenuItem[] => {
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
                    ReservationsPermissions.addReservations
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
    //#endregion
}