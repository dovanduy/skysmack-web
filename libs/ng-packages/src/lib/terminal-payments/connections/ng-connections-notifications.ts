import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Connection, ConnectionKey } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgConnectionsNotifications extends RecordNotifications<Connection, ConnectionKey> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
