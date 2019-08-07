import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import {
    Observable
} from 'rxjs';
import { AccessPoliciesPermissions } from '@skysmack/ng-access-policies';
import { AccessPoliciesDashboardComponent } from './components/access-policies-dashboard/access-policies-dashboard.component';
import { getMenuEntries } from '@skysmack/ng-framework';
import { AccessPoliciesTypeId } from '@skysmack/package-types';

@Injectable({ providedIn: 'root' })
export class NgAccessPoliciesDashboardMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'ACCESS_POLICIES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, AccessPoliciesTypeId, componentKey, AccessPoliciesDashboardComponent.COMPONENT_KEY, this.getAccessPoliciesDashboardMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, AccessPoliciesTypeId, componentKey, AccessPoliciesDashboardComponent.COMPONENT_KEY, this.getAccessPoliciesDashboardMenuItems, this.store);
    };

    public getAccessPoliciesDashboardMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ]
    };

    public getAccessPoliciesDashboardMenuItems = () => {
        return [
            new MenuItem({
                url: 'permissions',
                displayName: this.translationPrefix + 'PERMISSIONS',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findPermissions
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'roles',
                displayName: this.translationPrefix + 'ROLES',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findRoles
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'rules',
                displayName: this.translationPrefix + 'RULES',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.findRules
                ],
                providedIn: ['sidebar']
            })
        ];
    };
}
