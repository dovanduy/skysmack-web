import { Injectable, Inject } from '@angular/core';
import { EmailTemplate } from '@skysmack/packages-emails';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgEmailTemplatesNotifications extends RecordNotifications<EmailTemplate, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
