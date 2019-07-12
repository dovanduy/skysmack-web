import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesNotifications extends RecordNotifications<AccessPolicyRole, AccessPolicyRoleKey> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
