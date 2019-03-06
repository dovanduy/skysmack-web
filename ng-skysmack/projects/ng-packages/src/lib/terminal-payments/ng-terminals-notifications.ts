import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Terminal } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalsNotifications extends RecordNotifications<Terminal, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
