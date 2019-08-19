import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { ReservationsPricingsPermissions } from '@skysmack/packages-reservations-pricings';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { ReservationsPricingsTypeId } from '@skysmack/package-types';
import { LodgingTypeReservationPriceChangesIndexComponent } from './components/lodging-type-reservation-price-changes-index/lodging-type-reservation-price-changes-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypeReservationPriceChangesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'LODGING_TYPE_RESERVATION_PRICE_CHANGES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypeReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingTypeReservationPriceChangesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypeReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingTypeReservationPriceChangesMenuItems, this.store);
    };

    private getLodgingTypeReservationPriceChangesMenuAreas = () => {
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
    };

    private getLodgingTypeReservationPriceChangesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ReservationsPricingsPermissions.addLodgingTypePriceChanges
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
}