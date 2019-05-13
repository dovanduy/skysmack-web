import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '../../../skysmack/redux/ng-skysmack-store';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsStore extends NgRecordStore<AccessPolicyPermissionsAppState, AccessPolicyPermission, number> {
    constructor(
        protected ngRedux: NgRedux<AccessPolicyPermissionsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'accessPolicyPermissions'); }
}
