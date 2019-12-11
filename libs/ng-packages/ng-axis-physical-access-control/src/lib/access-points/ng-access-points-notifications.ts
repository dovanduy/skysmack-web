import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { AccessPoint, } from './models/access-point';

@Injectable({ providedIn: 'root' })
export class NgAccessPointsNotifications extends RecordNotifications<AccessPoint, string> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
