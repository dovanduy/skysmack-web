import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { AccessPolicyRule } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesNotifications extends DocumentRecordNotifications<AccessPolicyRule, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
