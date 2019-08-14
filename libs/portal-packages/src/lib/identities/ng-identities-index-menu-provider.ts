import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, safeHasValue, Package, AllowAccessFor, MenuProvider, TOPBAR, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { IdentitiesPermissions } from '@skysmack/packages-identities';
import { map } from 'rxjs/operators';
import { IdentitiesTypeId } from '@skysmack/package-types';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'IDENTITIES.INDEX.';

    constructor(
        public store: NgSkysmackStore,
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        if (componentKey === 'identities-index') {
            return of([
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
                }),
                new MenuArea({
                    area: 'identities',
                    icon: 'account_circle',
                    translationPrefix: this.translationPrefix,
                    order: 1,
                })
            ])
        } else {
            return of([]);
        }
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return this.store.getSkysmack().pipe(
            safeHasValue(),
            map((currentTenant: Skysmack) => {
                const identityPackages = currentTenant.packages
                    .filter((_package: Package) => _package.type === IdentitiesTypeId);

                let menuItems: MenuItem[] = [];

                // Only show if in the right place
                if (identityPackages.map(p => p.path).includes(packagePath) && componentKey === 'identities-index') {
                    menuItems = this.identitiesIndexDefaultMenuItems();
                }

                // Always
                return menuItems.concat(identityPackages
                    .map(_package => new MenuItem({
                        area: 'identities',
                        allowAccessFor: AllowAccessFor.authenticated,
                        providedIn: [TOPBAR]
                    }).asUrlAction(_package.path, _package.name, 'account_circle'))
                );
            }
            )
        );
    };

    private identitiesIndexDefaultMenuItems(): MenuItem[] {
        return [
            new MenuItem({
                url: 'roles',
                displayName: this.translationPrefix + 'ROLES',
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
                displayName: this.translationPrefix + 'USERS',
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
                displayName: this.translationPrefix + 'APPLICATIONS',
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
                displayName: this.translationPrefix + 'CLIENTS',
                area: 'manage',
                order: 2,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'change-password',
                displayName: this.translationPrefix + 'CHANGE_PASSWORD',
                area: 'account',
                order: 1,
                icon: 'group_add',
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'forgot-password',
                displayName: this.translationPrefix + 'FORGOT_PASSWORD',
                area: 'account',
                order: 1,
                icon: 'group_add',
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'confirm-email',
                displayName: this.translationPrefix + 'CONFIRM_EMAIL',
                area: 'account',
                order: 1,
                icon: 'group_add',
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'settings/lockout',
                displayName: this.translationPrefix + 'AVAILABLE_SETTINGS.LOCKOUT',
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
                displayName: this.translationPrefix + 'AVAILABLE_SETTINGS.USER',
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
                displayName: this.translationPrefix + 'AVAILABLE_SETTINGS.PASSWORD',
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
                displayName: this.translationPrefix + 'AVAILABLE_SETTINGS.SIGNIN',
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
}
