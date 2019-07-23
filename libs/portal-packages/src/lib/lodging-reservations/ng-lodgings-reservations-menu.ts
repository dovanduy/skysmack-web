import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ReservationsPermissions } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsMenu extends SidebarMenu {
    public menuId = 'lodgingsReservations';
    public translationPrefix = 'LODGING_RESERVATIONS.INDEX.';

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
        this.addToPrimaryMenuAreas([
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'reservations',
                translationPrefix: this.translationPrefix,
                order: 2,
                permissions: [
                    ReservationsPermissions.findReservations
                ]
            }),
            new MenuArea({
                area: 'settings',
                translationPrefix: this.translationPrefix,
                order: 4,
            })
        ]);

        this.addToPrimaryMenuItems([
            new MenuItem({
                url: '/' + this.packagePath + '/create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    ReservationsPermissions.addReservations
                ]
            }),

            new MenuItem({
                url: '/' + this.packagePath,
                displayName: this.translationPrefix + 'ALL',
                area: 'reservations',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    ReservationsPermissions.findReservations
                ]
            }),
            new MenuItem({
                url: '/' + this.packagePath + '/arrivals',
                displayName: this.translationPrefix + 'ARRIVALS',
                area: 'reservations',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    ReservationsPermissions.findReservations
                ]
            }),
            new MenuItem({
                url: '/' + this.packagePath + '/stays',
                displayName: this.translationPrefix + 'STAYS',
                area: 'reservations',
                order: 2,
                icon: 'groupAdd',
                permissions: [
                    ReservationsPermissions.findReservations
                ]
            }),
            new MenuItem({
                url: '/' + this.packagePath + '/departures',
                displayName: this.translationPrefix + 'DEPARTURES',
                area: 'reservations',
                order: 3,
                icon: 'groupAdd',
                permissions: [
                    ReservationsPermissions.findReservations
                ]
            }),
            new MenuItem({
                url: '/' + this.packagePath + '/settings/checkin',
                displayName: this.translationPrefix + 'SETTINGS',
                area: 'settings',
                order: 3,
                icon: 'groupAdd',
                permissions: [
                    ReservationsPermissions.checkIn
                ]
            })
        ]);

        this.setBackButton({ connectedPackage: true });
    }

    public setSpeedDialMenu() {
        this.addToSpeedDialMenuItems([
            new MenuItem({
                url: '/' + this.packagePath + '/create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
                permissions: [
                    ReservationsPermissions.addReservations
                ]
            }),
        ]);
    }
}
