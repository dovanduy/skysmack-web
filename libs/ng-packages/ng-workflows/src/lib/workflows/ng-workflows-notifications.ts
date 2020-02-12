import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Workflow } from '@skysmack/packages-workflows';

@Injectable({ providedIn: 'root' })
export class NgWorkflowsNotifications extends RecordNotifications<Workflow, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
