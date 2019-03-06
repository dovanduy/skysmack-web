import { Injectable, Inject } from '@angular/core';
import { InvoicePayment } from '@skysmack/packages-invoices';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsNotifications extends RecordNotifications<InvoicePayment, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
