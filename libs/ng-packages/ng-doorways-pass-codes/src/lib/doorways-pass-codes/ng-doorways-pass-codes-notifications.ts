import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { DoorwayPassCode, DoorwayPassCodeKey } from './models/doorway-pass-code';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesNotifications extends RecordNotifications<DoorwayPassCode, DoorwayPassCodeKey> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
