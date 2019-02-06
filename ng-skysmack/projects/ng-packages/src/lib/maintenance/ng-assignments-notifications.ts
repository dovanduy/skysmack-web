import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Assignment } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsNotifications extends DocumentRecordNotifications<Assignment, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
