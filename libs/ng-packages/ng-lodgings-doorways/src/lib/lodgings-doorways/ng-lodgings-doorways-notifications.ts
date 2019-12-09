import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { LodgingDoorway, LodgingDoorwayKey } from './models/lodging-doorway';

@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysNotifications extends RecordNotifications<LodgingDoorway, LodgingDoorwayKey> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
