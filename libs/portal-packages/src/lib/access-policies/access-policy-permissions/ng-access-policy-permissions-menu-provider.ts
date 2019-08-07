import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { AccessPoliciesPermissions } from '@skysmack/ng-access-policies';
import { setBackButton, getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { AccessPoliciesTypeId } from '@skysmack/package-types';
import { AccessPolicyPermissionsIndexComponent } from './components/access-policy-permissions-index/access-policy-permissions-index.component';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'ACCESS_POLICY_PERMISSIONS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyPermissionsIndexComponent.COMPONENT_KEY, this.getAccessPolicyPermissionsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyPermissionsIndexComponent.COMPONENT_KEY, this.getAccessPolicyPermissionsMenuItems, this.store);
    };

    public getAccessPolicyPermissionsMenuAreas = () => {
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
        ];
    };

    public getAccessPolicyPermissionsMenuItems =  (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    AccessPoliciesPermissions.addPermissions
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            setBackButtonV2(packagePath)
        ];
    };
}
