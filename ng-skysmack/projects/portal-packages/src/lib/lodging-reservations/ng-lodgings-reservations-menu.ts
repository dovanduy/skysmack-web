import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';

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
        this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('reservations', this.translationPrefix, 2));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 3));
        this.primaryMenuAreas.push(new MenuArea('connected packages', this.translationPrefix, 4));

        this.primaryMenuItems.push(new MenuItem({
            url: '/' + this.packagePath + '/create',
            displayName: this.translationPrefix + 'CREATE',
            area: 'actions',
            order: 1,
            icon: 'groupAdd',
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: '/' + this.packagePath,
            displayName: this.translationPrefix + 'ALL',
            area: 'reservations',
            order: 1,
            icon: 'groupAdd',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: '/' + this.packagePath + '/arrivals',
            displayName: this.translationPrefix + 'ARRIVALS',
            area: 'reservations',
            order: 1,
            icon: 'groupAdd',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: '/' + this.packagePath + '/stays',
            displayName: this.translationPrefix + 'STAYS',
            area: 'reservations',
            order: 2,
            icon: 'groupAdd',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: '/' + this.packagePath + '/departures',
            displayName: this.translationPrefix + 'DEPARTURES',
            area: 'reservations',
            order: 3,
            icon: 'groupAdd',
        }));

        this.setBackButton({ connectedPackage: true });
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem({
                url: '/' + this.packagePath + '/create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
            }),
        ];
    }
}
