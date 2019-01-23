import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgAccessPolicyPermissionsRequests } from './ng-access-policy-permissions-requests';
import { AccessPolicyPermission } from '@skysmack/packages-skysmack-core';


@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsEpics extends RecordEpicsBase<AccessPolicyPermission, number> {
    constructor(protected requests: NgAccessPolicyPermissionsRequests) {
        super(requests, 'ACCESS_POLICY_PERMISSIONS_');
    }
}
