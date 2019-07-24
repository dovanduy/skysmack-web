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
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            }),
            new MenuArea({
                area: 'account',
                translationPrefix: this.translationPrefix,
                order: 3
            }),
            new MenuArea({
                area: 'settings',
                translationPrefix: this.translationPrefix,
                order: 3
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
                url: 'applications',
                displayName: this.translationPrefix + 'APPLICATIONS',
                area: 'manage',
                order: 3,
                icon: 'groupAdd',
                permissions: [
                    IdentitiesPermissions.findApplications
                ]
            }),
            new MenuItem({
                url: 'change-password',
                displayName: this.translationPrefix + 'CHANGE_PASSWORD',
                area: 'account',
                order: 1,
                icon: 'groupAdd'
            }),
            new MenuItem({
                url: 'forgot-password',
                displayName: this.translationPrefix + 'FORGOT_PASSWORD',
                area: 'account',
                order: 1,
                icon: 'groupAdd'
            }),
            new MenuItem({
                url: 'confirm-email',
                displayName: this.translationPrefix + 'CONFIRM_EMAIL',
                area: 'account',
                order: 1,
                icon: 'groupAdd'
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
