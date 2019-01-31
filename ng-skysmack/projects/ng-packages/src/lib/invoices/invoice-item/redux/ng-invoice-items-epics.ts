import { NgInvoiceItemsRequests } from './ng-invoice-items-requests';
import { InvoiceItem } from '@skysmack/packages-invoices';
import { Injectable } from '@angular/core';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { NgInvoiceItemsNotifications } from '../ng-invoice-items-notifications';


@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsEpics extends DocumentRecordEpicsBase<InvoiceItem, number> {
    constructor(protected requests: NgInvoiceItemsRequests, protected notifications: NgInvoiceItemsNotifications) {
        super(requests, 'INVOICE_ITEMS_', notifications);
    }
}
