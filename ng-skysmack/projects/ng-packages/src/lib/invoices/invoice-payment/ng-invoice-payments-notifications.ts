import { Injectable, Inject } from '@angular/core';
import { InvoicePayment } from '@skysmack/packages-invoices';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsNotifications extends DocumentRecordNotifications<InvoicePayment, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
