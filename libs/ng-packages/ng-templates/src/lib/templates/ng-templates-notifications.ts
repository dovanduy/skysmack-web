import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Template } from '@skysmack/packages-templates';

@Injectable({ providedIn: 'root' })
export class NgTemplatesNotifications extends RecordNotifications<Template, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
