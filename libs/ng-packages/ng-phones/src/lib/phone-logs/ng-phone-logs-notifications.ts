import { Injectable, Inject } from '@angular/core';
import { Notifications, RecordNotifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { PhoneLog } from '@skysmack/packages-phones';

@Injectable({ providedIn: 'root' })
export class NgPhoneLogsNotifications extends RecordNotifications<PhoneLog, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}

