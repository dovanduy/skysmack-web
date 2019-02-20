import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccessPolicyRolesAppState, AccessPolicyRolesActions } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesActions extends AccessPolicyRolesActions {
    constructor(protected store: NgRedux<AccessPolicyRolesAppState>) { super(store); }
}
