import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { AccessPoliciesPermissions } from '@skysmack/ng-access-policies';
import { getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { AccessPoliciesTypeId } from '@skysmack/package-types';
import { AccessPolicyRolesIndexComponent } from './components/access-policy-roles-index/access-policy-roles-index.component';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'ACCESS_POLICY_ROLES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyRolesIndexComponent.COMPONENT_KEY, this.getAccessPolicyRolesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyRolesIndexComponent.COMPONENT_KEY, this.getAccessPolicyRolesMenuItems, this.store);
    };

    public getAccessPolicyRolesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ]
    };

    public getAccessPolicyRolesMenuItems =  (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'group_add',
                permissions: [
                    AccessPoliciesPermissions.addRoles
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            setBackButtonV2(packagePath)
        ];
    };
}
