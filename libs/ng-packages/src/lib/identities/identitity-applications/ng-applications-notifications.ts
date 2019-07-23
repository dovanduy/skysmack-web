import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Application } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgApplicationsNotifications extends RecordNotifications<Application, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
