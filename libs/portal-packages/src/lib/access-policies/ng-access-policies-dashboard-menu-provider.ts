import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import {
    Observable
} from 'rxjs';
import { AccessPoliciesPermissions } from '@skysmack/ng-access-policies';
import { AccessPoliciesDashboardComponent } from './components/access-policies-dashboard/access-policies-dashboard.component';
import { getMenuEntries, getCombinedMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { AccessPoliciesTypeId } from '@skysmack/package-types';
import { AccessPolicyPermissionsIndexComponent } from './access-policy-permissions/components/access-policy-permissions-index/access-policy-permissions-index.component';
import { AccessPolicyRolesIndexComponent } from './access-policy-roles/components/access-policy-roles-index/access-policy-roles-index.component';
import { AccessPolicyRulesIndexComponent } from './access-policy-rules/components/access-policy-rules-index/access-policy-rules-index.component';

@Injectable({ providedIn: 'root' })
export class NgAccessPoliciesDashboardMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private indexTranslationPrefix = 'ACCESS_POLICIES.INDEX.';
    private permissionsTranslationPrefix = 'ACCESS_POLICY_PERMISSIONS.INDEX.';
    private RolesTranslationPrefix = 'ACCESS_POLICY_ROLES.INDEX.';
    private RulesTranslationPrefix = 'ACCESS_POLICY_RULES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, AccessPoliciesTypeId, componentKey, AccessPoliciesDashboardComponent.COMPONENT_KEY, this.getAccessPoliciesDashboardMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyPermissionsIndexComponent.COMPONENT_KEY, this.getAccessPolicyPermissionsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyRolesIndexComponent.COMPONENT_KEY, this.getAccessPolicyRolesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyRulesIndexComponent.COMPONENT_KEY, this.getAccessPolicyRulesMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, AccessPoliciesTypeId, componentKey, AccessPoliciesDashboardComponent.COMPONENT_KEY, this.getAccessPoliciesDashboardMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyPermissionsIndexComponent.COMPONENT_KEY, this.getAccessPolicyPermissionsMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyRolesIndexComponent.COMPONENT_KEY, this.getAccessPolicyRolesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyRulesIndexComponent.COMPONENT_KEY, this.getAccessPolicyRulesMenuItems, this.store)
        );
    };

    private getAccessPoliciesDashboardMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.indexTranslationPrefix,
                order: 1
            })
        ]
    };

    private getAccessPolicyPermissionsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.permissionsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.permissionsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getAccessPolicyRolesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.RolesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.RolesTranslationPrefix,
                order: 2
            })
        ]
    };

    private getAccessPolicyRulesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.RulesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.RulesTranslationPrefix,
                order: 2
            })
        ]
    };

    private getAccessPoliciesDashboardMenuItems = () => {
        return [
            new MenuItem({
                url: 'permissions',
                displayName: this.indexTranslationPrefix + 'PERMISSIONS',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findPermissions
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'roles',
                displayName: this.indexTranslationPrefix + 'ROLES',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findRoles
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'rules',
                displayName: this.indexTranslationPrefix + 'RULES',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findRules
                ],
                providedIn: [SIDEBAR]
            })
        ];
    };

    private getAccessPolicyPermissionsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.permissionsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    AccessPoliciesPermissions.addPermissions
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };

    private getAccessPolicyRolesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.RolesTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.addRoles
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };

    private getAccessPolicyRulesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.RulesTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.addRules
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
}

