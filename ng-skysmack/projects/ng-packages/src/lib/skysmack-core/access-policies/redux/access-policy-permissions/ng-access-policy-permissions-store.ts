import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsStore extends NgRecordReduxStore<AccessPolicyPermissionsAppState, AccessPolicyPermission, number> {
    constructor(protected ngRedux: NgRedux<AccessPolicyPermissionsAppState>) { super(ngRedux, 'accessPolicyPermissions'); }
}
