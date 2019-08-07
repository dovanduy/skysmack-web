import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { ReservationsPricingsPermissions } from '@skysmack/packages-reservations-pricings';
import { setBackButton, getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { ReservationsPricingsTypeId } from '@skysmack/package-types';
import { LodgingTypeReservationPriceChangesIndexComponent } from './components/lodging-type-reservation-price-changes-index/lodging-type-reservation-price-changes-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypeReservationPriceChangesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGING_TYPE_RESERVATION_PRICE_CHANGES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypeReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingTypeReservationPriceChangesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypeReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingTypeReservationPriceChangesMenuItems, this.store);
    };

    public getLodgingTypeReservationPriceChangesMenuAreas = () => {
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

    public getLodgingTypeReservationPriceChangesMenuItems = (packagePath: string): MenuItem[] => {
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
                providedIn: ['sidebar', 'speedDial']
            }),
            setBackButtonV2(packagePath)
        ];
    };
}