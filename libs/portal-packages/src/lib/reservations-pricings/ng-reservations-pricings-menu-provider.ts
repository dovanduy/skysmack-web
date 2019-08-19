import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ReservationsPricingsPermissions } from '@skysmack/packages-reservations-pricings';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, getConnectedPackageMenuEntries } from '@skysmack/ng-framework';
import { ReservationsPricingsTypeId, LodgingReservationsTypeId } from '@skysmack/package-types';
import { ReservationsPricingsIndexComponent } from './components/reservations-pricings-index/reservations-pricings-index.component';
import { LodgingsReservationsIndexComponent } from '../lodging-reservations/lodging-reservations/lodgings-reservations-index/lodgings-reservations-index.component';

@Injectable({ providedIn: 'root' })
export class NgReservationsPricingsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'RESERVATIONS_PRICINGS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(
            packagePath,
            ReservationsPricingsTypeId,
            componentKey,
            ReservationsPricingsIndexComponent.COMPONENT_KEY,
            this.getReservationsPricingsMenuAreas,
            this.store
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(
                packagePath,
                ReservationsPricingsTypeId,
                componentKey,
                ReservationsPricingsIndexComponent.COMPONENT_KEY,
                this.getReservationsPricingsMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                ReservationsPricingsTypeId,
                LodgingReservationsTypeId,
                componentKey,
                LodgingsReservationsIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    private getReservationsPricingsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ];
    };

    private getReservationsPricingsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'reservation-price-changes',
                displayName: this.translationPrefix + 'RESERVATION_PRICE_CHANGES',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    ReservationsPricingsPermissions.findLodgingPriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'prices',
                displayName: this.translationPrefix + 'PRICES',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [
                    ReservationsPricingsPermissions.findLodgingPriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'types/reservation-price-changes',
                displayName: this.translationPrefix + 'RESERVATION_PRICE_CHANGES_TYPES',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                    ReservationsPricingsPermissions.findLodgingPriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'types/prices',
                displayName: this.translationPrefix + 'PRICES_TYPES',
                area: 'manage',
                order: 4,
                icon: 'group_add',
                permissions: [
                    ReservationsPricingsPermissions.findLodgingTypePriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
}