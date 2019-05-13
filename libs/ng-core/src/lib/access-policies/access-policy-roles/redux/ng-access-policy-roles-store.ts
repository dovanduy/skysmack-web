import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '../../../skysmack/redux/ng-skysmack-store';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesStore extends NgRecordStore<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> {
    constructor(
        protected ngRedux: NgRedux<AccessPolicyRolesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'accessPolicyRoles'); }
}
