import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { AccessPolicyRole } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesNotifications extends DocumentRecordNotifications<AccessPolicyRole, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
