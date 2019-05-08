import { Injectable, Inject } from '@angular/core';
import { InvoicesCashPayment } from '@skysmack/packages-invoices-cash-payments';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsNotifications extends RecordNotifications<InvoicesCashPayment, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
