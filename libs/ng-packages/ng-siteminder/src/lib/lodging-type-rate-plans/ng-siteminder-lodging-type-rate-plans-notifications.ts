import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { LodgingTypeRatePlan, LodgingTypeRatePlanKey } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlansNotifications extends RecordNotifications<LodgingTypeRatePlan, LodgingTypeRatePlanKey> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
