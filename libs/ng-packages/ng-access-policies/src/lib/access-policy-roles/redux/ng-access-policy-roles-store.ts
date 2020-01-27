import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_REDUCER_KEY } from '@skysmack/packages-skysmack-core';
import { DependencyOptions, LocalObject, hasValue } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesStore extends NgRecordStore<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'rule',
            relationIdSelector: 'ruleId',
            stateSelector: ACCESS_POLICY_ROLES_REDUCER_KEY
        }),
        new DependencyOptions({
            relationSelector: 'role',
            relationIdSelector: 'roleId',
            stateSelector: ACCESS_POLICY_ROLES_REDUCER_KEY
        })
    ];

    constructor(
        protected ngRedux: NgRedux<AccessPolicyRolesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ACCESS_POLICY_ROLES_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<AccessPolicyRole, AccessPolicyRoleKey>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: AccessPolicyRoleKey): Observable<LocalObject<AccessPolicyRole, AccessPolicyRoleKey>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }

    protected getSingleRecord(packagePath: string, id: AccessPolicyRoleKey): Observable<LocalObject<AccessPolicyRole, AccessPolicyRoleKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => {
                const firstIdMatch = record.object.id.roleId === id.roleId;
                const secondIdMatch = record.object.id.ruleId === id.ruleId;
                return (firstIdMatch && secondIdMatch) ? true : false;
            })),
            hasValue()
        );
    }
}
