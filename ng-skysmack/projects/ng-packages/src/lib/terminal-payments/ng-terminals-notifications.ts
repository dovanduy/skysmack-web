import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Terminal } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalsNotifications extends DocumentRecordNotifications<Terminal, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
