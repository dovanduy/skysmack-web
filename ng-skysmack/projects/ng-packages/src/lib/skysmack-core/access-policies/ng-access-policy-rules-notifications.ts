import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { AccessPolicyRule } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesNotifications extends RecordNotifications<AccessPolicyRule, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
