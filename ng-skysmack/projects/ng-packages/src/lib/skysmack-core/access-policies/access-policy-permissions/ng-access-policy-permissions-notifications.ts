import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { AccessPolicyPermission } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsNotifications extends RecordNotifications<AccessPolicyPermission, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
