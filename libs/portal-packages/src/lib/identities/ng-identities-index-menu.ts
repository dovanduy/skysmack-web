import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, safeHasValue, Package, AllowAccessFor } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { IdentitiesPermissions } from '@skysmack/packages-identities';
import { take, map } from 'rxjs/operators';
import { IdentitiesTypeId } from '@skysmack/package-types';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesIndexMenu extends SidebarMenu {
    public id = Guid.create().toString();
    public menuId = 'identities';
    public translationPrefix = 'IDENTITIES.INDEX.';

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
        this.addToNavbarMenuAreas([
            new MenuArea({ // Keep identical to the one in ng-identities-index-menu.ts
                area: 'identities',
                icon: 'account_circle',
                translationPrefix: this.translationPrefix,
                order: 1,
            })
        ]);

        const addNavbarMenuItems = () => {
            this.store.getSkysmack().pipe(safeHasValue(), take(1), map((currentTenant: Skysmack) => currentTenant.packages
                .filter((_package: Package) => _package.type === IdentitiesTypeId)
                .map(_package => this.addToNavbarMenuItems(new MenuItem({
                    area: 'identities', // Area provided from oauth2 menu.
                    allowAccessFor: AllowAccessFor.authenticated
                }).asUrlAction(_package.path, _package.name, 'account_circle'))))).subscribe();
        }
        addNavbarMenuItems();

        this.addToPrimaryMenuAreas([
            new MenuArea({
                area: 'actions2',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage2',
                translationPrefix: this.translationPrefix,
                order: 2
            }),
            new MenuArea({
                area: 'account2',
                translationPrefix: this.translationPrefix,
                order: 3
            }),
            new MenuArea({
                area: 'settings2',
                translationPrefix: this.translationPrefix,
                order: 3
            })
        ]);

        this.addToPrimaryMenuItems([
            new MenuItem({
                url: 'roles2',
                displayName: this.translationPrefix + 'ROLES',
                area: 'manage',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    IdentitiesPermissions.findRoles
                ]
            }),
            new MenuItem({
                url: 'users2',
                displayName: this.translationPrefix + 'USERS',
                area: 'manage2',
                order: 2,
                icon: 'groupAdd2',
                permissions: [
                    IdentitiesPermissions.findUsers
                ]
            }),
            new MenuItem({
                url: 'applications2',
                displayName: this.translationPrefix + 'APPLICATIONS',
                area: 'manage2',
                order: 3,
                icon: 'groupAdd2',
                permissions: [
                    IdentitiesPermissions.findApplications
                ]
            }),
            new MenuItem({
                url: 'change-password2',
                displayName: this.translationPrefix + 'CHANGE_PASSWORD',
                area: 'account2',
                order: 1,
                icon: 'groupAdd2'
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
