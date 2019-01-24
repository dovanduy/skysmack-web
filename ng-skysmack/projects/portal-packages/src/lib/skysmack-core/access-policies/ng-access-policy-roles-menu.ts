import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuItemProvider } from '@skysmack/ng-ui';
import { MenuArea } from '@skysmack/ng-ui';
import { MenuItem } from '@skysmack/ng-ui';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesMenu extends SidebarMenu {
    public menuId = 'accessPolicies';
    public translationPrefix = 'ACCESS_POLICY_ROLES.INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        this.primaryMenuItems.push(new MenuItem('create', this.translationPrefix + 'CREATE', 'actions', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('/skysmack/access-policies', this.translationPrefix + 'BACK', 'manage', 4, 'arrowBack'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
