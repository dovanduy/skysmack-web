import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { CashPayment } from '@skysmack/packages-invoices-cash-payments';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsNotifications extends RecordNotifications<CashPayment, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
