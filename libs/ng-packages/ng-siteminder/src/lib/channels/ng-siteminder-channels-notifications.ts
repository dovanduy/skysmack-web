import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Channel } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelsNotifications extends RecordNotifications<Channel, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
