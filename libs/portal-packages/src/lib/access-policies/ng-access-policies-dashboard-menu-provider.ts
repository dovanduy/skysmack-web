import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { AccessPoliciesPermissions } from '@skysmack/ng-access-policies';

@Injectable({ providedIn: 'root' })
export class NgAccessPoliciesDashboardMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'ACCESS_POLICIES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'access-policies-dashboard') {
            return of([
                new MenuItem({
                    url: 'permissions',
                    displayName: this.translationPrefix + 'PERMISSIONS',
                    area: 'manage',
                    order: 1,
                    icon: 'groupAdd',
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
                    icon: 'groupAdd',
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
                    icon: 'groupAdd',
                    permissions: [
                        AccessPoliciesPermissions.findRules
                    ],
                    providedIn: ['sidebar']
                })
            ]);
        } else {
           return of([]);
        }
    };
}
