import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { MenuItemProvider, MenuArea, MenuItem } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsMenu extends SidebarMenu {
    public menuId = 'lodgingsReservations';
    public translationPrefix = 'LODGING_RESERVATIONS.INDEX.';

    constructor(
        public store: NgSkysmackStore,
        public router: Router,
        @Inject(MenuItemProvider.TOKEN) menuItemProviders: MenuItemProvider[],
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

        this.primaryMenuItems.push(new MenuItem('create', this.translationPrefix + 'CREATE', 'actions', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('arrivals', this.translationPrefix + 'ARRIVALS', 'reservations', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('stays', this.translationPrefix + 'STAYS', 'reservations', 2, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('departures', this.translationPrefix + 'DEPARTURES', 'reservations', 3, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('availability', this.translationPrefix + 'AVAILABILITY', 'reservations', 4, 'groupAdd'));

        // TODO: FIX THIS!
        // this.store.getFeatureDependencyPackage(this.path).pipe(
        //     map(_package => this.primaryMenuItems.push(new MenuItem('/' + _package.url, _package.url, 'manage', 2, 'arrowBack'))),
        //     take(1)
        // ).subscribe();
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
