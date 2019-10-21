import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { RatePlan } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderRatePlansNotifications extends RecordNotifications<RatePlan, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
