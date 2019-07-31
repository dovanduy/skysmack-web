import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { LodgingType } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesNotifications extends RecordNotifications<LodgingType, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
