import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { AccessPolicyPermission } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsNotifications extends DocumentRecordNotifications<AccessPolicyPermission, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
