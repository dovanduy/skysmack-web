import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { IdentitiesPermissions } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesIndexMenu extends SidebarMenu {
    public menuId = 'identities';
    public translationPrefix = 'IDENTITIES.INDEX.';

    constructor(
        public redux: NgSkysmackStore,
        public router: Router,
        public menuItemProviders: NgMenuItemProviders
    ) {
        super(redux, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.addToPrimaryMenuAreas([
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2,
            })
        ]);

        this.addToPrimaryMenuItems([
            new MenuItem({
                url: 'roles',
                displayName: this.translationPrefix + 'ROLES',
                area: 'manage',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    IdentitiesPermissions.findRoles
                ]
            }),
            new MenuItem({
                url: 'users',
                displayName: this.translationPrefix + 'USERS',
                area: 'manage',
                order: 2,
                icon: 'groupAdd',
                permissions: [
                    IdentitiesPermissions.findUsers
                ]
            }),
            new MenuItem({
                url: 'account',
                displayName: this.translationPrefix + 'ACCOUNTS',
                area: 'manage',
                order: 2,
                icon: 'groupAdd',
                permissions: [
                    // ???
                ]
            }),
            new MenuItem({
                url: 'settings/lockout',
                displayName: this.translationPrefix + 'AVAILABLE_SETTINGS.LOCKOUT',
                area: 'settings',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    IdentitiesPermissions.getLockoutSettings
                ]
            }),
            new MenuItem({
                url: 'settings/user',
                displayName: this.translationPrefix + 'AVAILABLE_SETTINGS.USER',
                area: 'settings',
                order: 2,
                icon: 'groupAdd',
                permissions: [
                    IdentitiesPermissions.getUserSettings
                ]
            }),
            new MenuItem({
                url: 'settings/password',
                displayName: this.translationPrefix + 'AVAILABLE_SETTINGS.PASSWORD',
                area: 'settings',
                order: 2,
                icon: 'groupAdd',
                permissions: [
                    IdentitiesPermissions.getPasswordSettings
                ]
            }),
            new MenuItem({
                url: 'settings/sign-in',
                displayName: this.translationPrefix + 'AVAILABLE_SETTINGS.SIGNIN',
                area: 'settings',
                order: 2,
                icon: 'groupAdd',
                permissions: [
                    IdentitiesPermissions.getSignInSettings
                ]
            })
        ]);
    }

    public setSpeedDialMenu() {
    }
}
