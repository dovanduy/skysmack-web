import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from 'lib/portal-ui/models/sidebar-menu/sidebar-menu';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack';
import { MenuItemProvider } from 'lib/portal-ui/providers/menu-item-provider';
import { MenuArea } from 'lib/portal-ui/models/sidebar-menu/menu-area';
import { MenuItem } from 'lib/portal-ui/models/sidebar-menu/menu-item';

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
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
