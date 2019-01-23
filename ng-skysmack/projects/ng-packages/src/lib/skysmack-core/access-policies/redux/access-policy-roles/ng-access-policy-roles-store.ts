import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { AccessPolicyRolesAppState, AccessPolicyRole } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesStore extends NgRecordReduxStore<AccessPolicyRolesAppState, AccessPolicyRole, number> {
    constructor(protected ngRedux: NgRedux<AccessPolicyRolesAppState>) { super(ngRedux, 'accessPolicyRoles'); }
}
