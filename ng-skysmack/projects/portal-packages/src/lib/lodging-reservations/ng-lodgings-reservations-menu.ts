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

        this.primaryMenuItems.push(new MenuItem('/' + this.packagePath + '/create', this.translationPrefix + 'CREATE', 'actions', 1, 'groupAdd'));

        this.primaryMenuItems.push(new MenuItem('/' + this.packagePath, this.translationPrefix + 'ALL', 'reservations', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('/' + this.packagePath + '/arrivals', this.translationPrefix + 'ARRIVALS', 'reservations', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('/' + this.packagePath + '/stays', this.translationPrefix + 'STAYS', 'reservations', 2, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('/' + this.packagePath + '/departures', this.translationPrefix + 'DEPARTURES', 'reservations', 3, 'groupAdd'));

        this.setBackButton({ connectedPackage: true });
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('/' + this.packagePath + '/create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
