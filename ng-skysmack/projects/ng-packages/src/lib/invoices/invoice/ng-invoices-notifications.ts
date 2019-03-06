import { Injectable, Inject } from '@angular/core';
import { Invoice } from '@skysmack/packages-invoices';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicesNotifications extends RecordNotifications<Invoice, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
