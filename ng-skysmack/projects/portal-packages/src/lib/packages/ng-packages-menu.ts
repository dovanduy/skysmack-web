import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemProvider } from '@skysmack/ng-ui';
import { MenuArea } from '@skysmack/ng-ui';
import { MenuItem } from '@skysmack/ng-ui';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgPackagesMenu extends SidebarMenu {
    public menuId = 'packages';
    public translationPrefix = 'PACKAGES.INDEX.';

    constructor(
        public redux: NgSkysmackStore,
        public router: Router,
        @Inject(MenuItemProvider.TOKEN) menuItemProviders: MenuItemProvider[],
    ) {
        super(redux, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));
        this.primaryMenuItems.push(new MenuItem('create', this.translationPrefix + 'CREATE', 'actions', 1, 'groupAdd'));

        // Menu button to navigate to available package charts when that code is uncommented.
        // this.primaryMenuItems.push(new MenuItem('available_packages', this.translationPrefix + 'AVAILABLE_PACKAGES', 'manage', 2, 'groupAdd'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
