import { Injectable, Inject } from '@angular/core';
import { Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';


@Injectable({ providedIn: 'root' })
export class NgAccountNotifications {
    protected defaultTranslationString = 'NOTIFICATIONS.';
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { }
}
