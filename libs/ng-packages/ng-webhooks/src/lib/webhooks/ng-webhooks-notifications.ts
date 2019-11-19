import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Webhook } from '@skysmack/packages-webhooks';

@Injectable({ providedIn: 'root' })
export class NgWebhooksNotifications extends RecordNotifications<Webhook, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
