import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Receipt } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgReceiptsNotifications extends RecordNotifications<Receipt, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
