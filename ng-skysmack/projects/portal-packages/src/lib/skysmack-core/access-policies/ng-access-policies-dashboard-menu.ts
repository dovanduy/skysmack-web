import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuItemProvider } from '@skysmack/ng-ui';
import { MenuArea } from '@skysmack/ng-ui';
import { MenuItem } from '@skysmack/ng-ui';

@Injectable({ providedIn: 'root' })
export class NgAccessPoliciesDashboardMenu extends SidebarMenu {
    public menuId = 'accessPolicies';
    public translationPrefix = 'ACCESS_POLICIES.INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        this.primaryMenuItems.push(new MenuItem('skysmack/access-policies/permissions', this.translationPrefix + 'PERMISSIONS', 'manage', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('skysmack/access-policies/roles', this.translationPrefix + 'ROLES', 'manage', 2, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('skysmack/access-policies/rules', this.translationPrefix + 'RULES', 'manage', 3, 'groupAdd'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [];
    }
}