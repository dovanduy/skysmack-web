import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { ReservationsPricingsPermissions } from '@skysmack/packages-reservations-pricings';
import { ReservationsPricingsTypeId } from '@skysmack/package-types';
import { LodgingReservationPriceChangesIndexComponent } from './components/lodging-reservation-price-changes-index/lodging-reservation-price-changes-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationPriceChangesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'LODGING_RESERVATION_PRICE_CHANGES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingReservationPriceChangesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingReservationPriceChangesMenuItems, this.store);
    };

    private getLodgingReservationPriceChangesMenuAreas = () => {
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

    private getLodgingReservationPriceChangesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ReservationsPricingsPermissions.addLodgingPriceChanges
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
}