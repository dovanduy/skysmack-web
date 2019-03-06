import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesNotifications extends RecordNotifications<AccessPolicyRole, AccessPolicyRoleKey> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
