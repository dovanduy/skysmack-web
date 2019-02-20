import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccessPolicyPermissionsAppState, AccessPolicyPermissionsActions } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsActions extends AccessPolicyPermissionsActions {
    constructor(protected store: NgRedux<AccessPolicyPermissionsAppState>) { super(store); }
}
