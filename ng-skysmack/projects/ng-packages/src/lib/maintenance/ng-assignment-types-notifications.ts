import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { AssignmentType } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesNotifications extends DocumentRecordNotifications<AssignmentType, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
