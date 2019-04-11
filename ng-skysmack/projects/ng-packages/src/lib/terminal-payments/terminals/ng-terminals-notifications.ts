import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { Terminal } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalsNotifications extends RecordNotifications<Terminal, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
