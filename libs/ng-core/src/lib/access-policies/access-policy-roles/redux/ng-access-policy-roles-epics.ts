import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgAccessPolicyRolesRequests } from './ng-access-policy-roles-requests';
import { AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_REDUX_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRolesNotifications } from '../ng-access-policy-roles-notifications';


@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesEpics extends RecordEpicsBase<AccessPolicyRole, AccessPolicyRoleKey> {
    constructor(protected requests: NgAccessPolicyRolesRequests, protected notifications: NgAccessPolicyRolesNotifications) {
        super(requests, ACCESS_POLICY_ROLES_REDUX_KEY, notifications);
    }
}
