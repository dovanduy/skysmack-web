import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { AssignmentType } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesNotifications extends RecordNotifications<AssignmentType, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
