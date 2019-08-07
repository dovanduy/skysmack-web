import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { AccessPoliciesPermissions } from '@skysmack/ng-access-policies';

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
        this.addToPrimaryMenuAreas([
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2,
            })
        ]);

        this.addToPrimaryMenuItems([
            new MenuItem({
                url: 'permissions',
                displayName: this.translationPrefix + 'PERMISSIONS',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findPermissions
                ]
            }),
            new MenuItem({
                url: 'roles',
                displayName: this.translationPrefix + 'ROLES',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findRoles
                ]
            }),
            new MenuItem({
                url: 'rules',
                displayName: this.translationPrefix + 'RULES',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findRules
                ]
            })
        ]);
    }

    public setSpeedDialMenu() {
    }
}
