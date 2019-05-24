import { Injectable, Inject } from '@angular/core';
import { Notifications, RecordNotifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { User } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgUsersNotifications extends RecordNotifications<User, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}

