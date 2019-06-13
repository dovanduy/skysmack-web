import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { ReservationsPricingsPermissions } from '@skysmack/packages-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgReservationsPricingsMenu extends SidebarMenu {
    public menuId = 'reservationsPricings';
    public translationPrefix = 'RESERVATIONS_PRICINGS.INDEX.';

    constructor(
        public store: NgSkysmackStore,
        public router: Router,
        public menuItemProviders: NgMenuItemProviders
    ) {
        super(store, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.primaryMenuAreas.push(new MenuArea({
            area: 'manage',
            translationPrefix: this.translationPrefix,
            order: 1,
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'reservation-price-changes',
            displayName: this.translationPrefix + 'RESERVATION_PRICE_CHANGES',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
            permissions: [
                ReservationsPricingsPermissions.findLodgingPriceChanges
            ]
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'prices',
            displayName: this.translationPrefix + 'PRICES',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
            permissions: [
                ReservationsPricingsPermissions.findLodgingPriceChanges
            ]
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'types/reservation-price-changes',
            displayName: this.translationPrefix + 'RESERVATION_PRICE_CHANGES_TYPES',
            area: 'manage',
            order: 3,
            icon: 'shortText',
            permissions: [
                ReservationsPricingsPermissions.findLodgingTypePriceChanges
            ]
        }));


        this.primaryMenuItems.push(new MenuItem({
            url: 'types/prices',
            displayName: this.translationPrefix + 'PRICES_TYPES',
            area: 'manage',
            order: 3,
            icon: 'shortText',
            permissions: [
                ReservationsPricingsPermissions.findLodgingTypePriceChanges
            ]
        }));

        this.setBackButton({ connectedPackage: true });
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
        ];
    }
}
