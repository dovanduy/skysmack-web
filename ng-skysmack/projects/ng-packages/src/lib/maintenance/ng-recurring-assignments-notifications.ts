import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { RecurringAssignment } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsNotifications extends DocumentRecordNotifications<RecurringAssignment, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
