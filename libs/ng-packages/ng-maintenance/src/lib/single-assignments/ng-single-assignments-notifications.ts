import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { SingleAssignment } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgSingleAssignmentsNotifications extends RecordNotifications<SingleAssignment, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
