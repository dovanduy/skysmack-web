import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { RecurringAssignment } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsNotifications extends RecordNotifications<RecurringAssignment, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
