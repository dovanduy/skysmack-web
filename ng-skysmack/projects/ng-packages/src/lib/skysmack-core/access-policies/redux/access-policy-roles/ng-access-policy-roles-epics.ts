import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgAccessPolicyRolesRequests } from './ng-access-policy-roles-requests';
import { AccessPolicyRole } from '@skysmack/packages-skysmack-core';


@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesEpics extends RecordEpicsBase<AccessPolicyRole, number> {
    constructor(protected requests: NgAccessPolicyRolesRequests) {
        super(requests, 'ACCESS_POLICY_ROLES_');
    }
}
