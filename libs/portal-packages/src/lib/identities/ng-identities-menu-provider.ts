import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, safeHasValue, Package, AllowAccessFor, MenuProvider, TOPBAR, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { IdentitiesPermissions } from '@skysmack/packages-identities';
import { map, switchMap } from 'rxjs/operators';
import { IdentitiesTypeId } from '@skysmack/package-types';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { IdentitiesIndexComponent } from './components/identities-index/identities-index.component';
import { getCombinedMenuEntries, getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { UsersIndexComponent } from './identity-users/components/users-index/users-index.component';
import { RolesIndexComponent } from './identity-roles/components/roles-index/roles-index.component';
import { ApplicationsIndexComponent } from './identity-applications/components/applications-index/applications-index.component';
import { ClientsIndexComponent } from './clients/components/clients-index/clients-index.component';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private identitiesTranslationPrefix = 'IDENTITIES.INDEX.';
    private usersTranslationPrefix = 'USERS.INDEX.';
    private rolesTranslationPrefix = 'ROLES.INDEX.';
    private applicationTranslationPrefix = 'APPLICATIONS.INDEX.';
    private clientsTranslationPrefix = 'CLIENTS.INDEX.';

    constructor(
        private store: NgSkysmackStore,
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                IdentitiesIndexComponent.COMPONENT_KEY,
                this.getIdentitiesIndexMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                UsersIndexComponent.COMPONENT_KEY,
                this.getUsersMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                RolesIndexComponent.COMPONENT_KEY,
                this.getRolesMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                ApplicationsIndexComponent.COMPONENT_KEY,
                this.getApplicationsMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                ClientsIndexComponent.COMPONENT_KEY,
                this.getClientsMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                IdentitiesIndexComponent.COMPONENT_KEY,
                this.getIdentitiesIndexMenuItems,
                this.store
            ).pipe(switchMap(menuItems => this.setIdentitiesAuthenticatedMenuItems(menuItems))),
            getMenuEntries<MenuItem>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                UsersIndexComponent.COMPONENT_KEY,
                this.getUsersMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                RolesIndexComponent.COMPONENT_KEY,
                this.getRolesMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                ApplicationsIndexComponent.COMPONENT_KEY,
                this.getApplicationsMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                IdentitiesTypeId,
                componentKey,
                ClientsIndexComponent.COMPONENT_KEY,
                this.getClientsMenuItems,
                this.store
            )
        );
    };

    //#region IdentitiesIndex
    private getIdentitiesIndexMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.identitiesTranslationPrefix,
                order: 2
            }),
            new MenuArea({
                area: 'account',
                translationPrefix: this.identitiesTranslationPrefix,
                order: 3
            }),
            new MenuArea({
                area: 'settings',
                translationPrefix: this.identitiesTranslationPrefix,
                order: 3
            }),
            new MenuArea({
                area: 'identities',
                icon: 'account_circle',
                translationPrefix: this.identitiesTranslationPrefix,
                order: 1,
            })
        ];
    }

    private getIdentitiesIndexMenuItems = (): MenuItem[] => {
        return [
            new MenuItem({
                url: 'roles',
                displayName: this.identitiesTranslationPrefix + 'ROLES',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    IdentitiesPermissions.findRoles
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'users',
                displayName: this.identitiesTranslationPrefix + 'USERS',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [
                    IdentitiesPermissions.findUsers
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'applications',
                displayName: this.identitiesTranslationPrefix + 'APPLICATIONS',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                    IdentitiesPermissions.findApplications
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'clients',
                displayName: this.identitiesTranslationPrefix + 'CLIENTS',
                area: 'manage',
                order: 2,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'change-password',
                displayName: this.identitiesTranslationPrefix + 'CHANGE_PASSWORD',
                area: 'account',
                order: 1,
                icon: 'group_add',
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'settings/lockout',
                displayName: this.identitiesTranslationPrefix + 'AVAILABLE_SETTINGS.LOCKOUT',
                area: 'settings',
                order: 1,
                icon: 'group_add',
                permissions: [
                    IdentitiesPermissions.getLockoutSettings
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'settings/user',
                displayName: this.identitiesTranslationPrefix + 'AVAILABLE_SETTINGS.USER',
                area: 'settings',
                order: 2,
                icon: 'group_add',
                permissions: [
                    IdentitiesPermissions.getUserSettings
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'settings/password',
                displayName: this.identitiesTranslationPrefix + 'AVAILABLE_SETTINGS.PASSWORD',
                area: 'settings',
                order: 2,
                icon: 'group_add',
                permissions: [
                    IdentitiesPermissions.getPasswordSettings
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'settings/sign-in',
                displayName: this.identitiesTranslationPrefix + 'AVAILABLE_SETTINGS.SIGNIN',
                area: 'settings',
                order: 2,
                icon: 'group_add',
                permissions: [
                    IdentitiesPermissions.getSignInSettings
                ],
                providedIn: [SIDEBAR]
            })
        ];
    }

    private setIdentitiesAuthenticatedMenuItems = (menuItems: MenuItem[]): Observable<MenuItem[]> => {
        return this.store.getSkysmack().pipe(
            safeHasValue(),
            map((currentTenant: Skysmack) => {
                const identityPackages = currentTenant.packages
                    .filter((_package: Package) => _package.type === IdentitiesTypeId);

                return menuItems.concat(identityPackages
                    .map(_package => new MenuItem({
                        area: 'identities',
                        allowAccessFor: AllowAccessFor.authenticated,
                        providedIn: [TOPBAR]
                    }).asUrlAction(_package.path, _package.name, 'account_circle'))
                );
            })
        );
    }
    //#endregion

    //#region Users
    private getUsersMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.usersTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.usersTranslationPrefix,
                order: 2
            })
        ];
    };

    private getUsersMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.usersTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/users/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    //??
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
    //#endregion

    //#region Roles
    private getRolesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.rolesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.rolesTranslationPrefix,
                order: 2
            })
        ];
    };

    private getRolesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.rolesTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/roles/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    //??
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
    //#endregion

    //#region Applications
    private getApplicationsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.applicationTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.applicationTranslationPrefix,
                order: 2
            })
        ];
    };

    private getApplicationsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.applicationTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/applications/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    //??
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
    //#endregion

    //#region Clients
    private getClientsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.clientsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.clientsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getClientsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.clientsTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/clients/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
    //#endregion
}
