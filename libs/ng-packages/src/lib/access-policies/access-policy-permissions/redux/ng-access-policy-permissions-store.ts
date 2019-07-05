import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission, ACCESS_POLICY_PERMISSIONS_REDUCER_KEY } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsStore extends NgRecordStore<AccessPolicyPermissionsAppState, AccessPolicyPermission, number> {
    constructor(
        protected ngRedux: NgRedux<AccessPolicyPermissionsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ACCESS_POLICY_PERMISSIONS_REDUCER_KEY); }
}
