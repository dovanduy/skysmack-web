import { Injectable, Inject } from '@angular/core';
import { InvoiceItem } from '@skysmack/packages-invoices';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsNotifications extends RecordNotifications<InvoiceItem, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
