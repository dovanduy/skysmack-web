import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Client } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgClientsNotifications extends RecordNotifications<Client, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
