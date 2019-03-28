import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_AREA_KEY } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesStore extends NgRecordStore<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> {
    constructor(protected ngRedux: NgRedux<AccessPolicyRolesAppState>) { super(ngRedux, ACCESS_POLICY_ROLES_AREA_KEY); }
}
