import { Injectable, Inject } from '@angular/core';
import { InvoicePayment } from '@skysmack/packages-invoices';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsNotifications extends RecordNotifications<InvoicePayment, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
