import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore, AccessPolciesPermissions } from '@skysmack/ng-core';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';

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
        this.primaryMenuAreas.push(new MenuArea({
            area: 'manage',
            translationPrefix: this.translationPrefix,
            order: 2,
        }));


        this.primaryMenuItems.push(new MenuItem({
            url: 'permissions',
            displayName: this.translationPrefix + 'PERMISSIONS',
            area: 'manage',
            order: 1,
            icon: 'groupAdd',
            permissions: [
                AccessPolciesPermissions.findPermissions
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'roles',
            displayName: this.translationPrefix + 'ROLES',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
            permissions: [
                AccessPolciesPermissions.findRoles
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'rules',
            displayName: this.translationPrefix + 'RULES',
            area: 'manage',
            order: 3,
            icon: 'groupAdd',
            permissions: [
                AccessPolciesPermissions.findRules
            ]
        }));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [];
    }
}
