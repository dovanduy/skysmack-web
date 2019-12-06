import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { DoorwayRelationKey, DoorwayRelation } from '../models/doorway-relation';

@Injectable({ providedIn: 'root' })
export class NgDoorwayRelationsNotifications extends RecordNotifications<DoorwayRelation, DoorwayRelationKey> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
