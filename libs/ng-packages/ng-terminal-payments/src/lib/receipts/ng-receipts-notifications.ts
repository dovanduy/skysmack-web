import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Receipt } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgReceiptsNotifications extends RecordNotifications<Receipt, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
