import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { AccessPoliciesPermissions } from '@skysmack/ng-access-policies';
import { setBackButton, getMenuEntries } from '@skysmack/ng-framework';
import { AccessPoliciesTypeId } from '@skysmack/package-types';
import { AccessPolicyRulesIndexComponent } from './components/access-policy-rules-index/access-policy-rules-index.component';



@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'ACCESS_POLICY_RULES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyRulesIndexComponent.COMPONENT_KEY, this.getAccessPolicyRulesMenuAreas(), this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, AccessPoliciesTypeId, componentKey, AccessPolicyRulesIndexComponent.COMPONENT_KEY, this.getAccessPolicyRulesMenuItems(), this.store).pipe(
            setBackButton({ customPath: '/access-policies' }),
        );
    };

    public getAccessPolicyRulesMenuAreas() {
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

    public getAccessPolicyRulesMenuItems() {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    AccessPoliciesPermissions.addRules
                ],
                providedIn: ['sidebar', 'speedDial']
            }),

        ];
    };
}
