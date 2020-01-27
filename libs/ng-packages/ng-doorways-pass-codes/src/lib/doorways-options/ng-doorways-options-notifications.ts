import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { DoorwayOption } from './models/doorway-option';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysOptionsNotifications extends RecordNotifications<DoorwayOption, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
