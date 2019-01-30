import { Injectable, Inject } from '@angular/core';
import { Invoice } from '@skysmack/packages-invoices';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicesNotifications extends DocumentRecordNotifications<Invoice, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
