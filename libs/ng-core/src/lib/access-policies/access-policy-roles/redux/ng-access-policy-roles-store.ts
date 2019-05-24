import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_REDUCER_KEY } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '../../../skysmack/redux/ng-skysmack-store';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesStore extends NgRecordStore<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> {
    constructor(
        protected ngRedux: NgRedux<AccessPolicyRolesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ACCESS_POLICY_ROLES_REDUCER_KEY); }
}
