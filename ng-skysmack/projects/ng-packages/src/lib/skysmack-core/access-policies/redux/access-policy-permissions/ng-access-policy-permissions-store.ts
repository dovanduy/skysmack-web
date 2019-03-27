import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsStore extends NgRecordStore<AccessPolicyPermissionsAppState, AccessPolicyPermission, number> {
    constructor(protected ngRedux: NgRedux<AccessPolicyPermissionsAppState>) { super(ngRedux, ACCESS_POLICY_PERMISSIONS_AREA_KEY); }
}
