import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';
import { ROLES_AREA_KEY } from '@skysmack/packages-identities/lib/constants/constants';


@Injectable({ providedIn: 'root' })
export class NgAccessPoliciesDashboardMenu extends SidebarMenu {
    public menuId = 'accessPolicies';
    public translationPrefix = 'ACCESS_POLICIES.INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        this.primaryMenuItems.push(new MenuItem('permissions', this.translationPrefix + 'PERMISSIONS', 'manage', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('roles', this.translationPrefix + 'ROLES', 'manage', 2, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('rules', this.translationPrefix + 'RULES', 'manage', 3, 'groupAdd'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [];
    }
}
