import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgAccessPolicyPermissionsRequests } from './ng-access-policy-permissions-requests';
import { AccessPolicyPermission, ACCESS_POLICY_PERMISSIONS_REDUX_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyPermissionsNotifications } from '../ng-access-policy-permissions-notifications';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsEpics extends RecordEpicsBase<AccessPolicyPermission, number> {
    constructor(protected requests: NgAccessPolicyPermissionsRequests, protected notifications: NgAccessPolicyPermissionsNotifications) {
        super(requests, ACCESS_POLICY_PERMISSIONS_REDUX_KEY, notifications);
    }
}
