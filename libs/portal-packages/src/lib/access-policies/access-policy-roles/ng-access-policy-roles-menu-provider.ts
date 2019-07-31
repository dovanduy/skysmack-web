import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { AccessPoliciesPermissions } from '@skysmack/ng-access-policies';
import { setBackButton } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'ACCESS_POLICY_ROLES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
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
            })
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === "access-policy-roles") {
            return of ([
                new MenuItem({
                    url: 'create',
                    displayName: this.translationPrefix + 'CREATE',
                    area: 'actions',
                    order: 1,
                    icon: 'groupAdd',
                    permissions: [
                        AccessPoliciesPermissions.addRoles
                    ],
                    providedIn: ['sidebar']
                })
            ]).pipe(setBackButton({ customPath: '/access-policies' }));
        } else {
            return of([]);
        } 
    };
}
