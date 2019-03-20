import { NgInvoiceItemsRequests } from './ng-invoice-items-requests';
import { InvoiceItem, INVOICE_ITEMS_REDUX_KEY } from '@skysmack/packages-invoices';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgInvoiceItemsNotifications } from '../ng-invoice-items-notifications';


@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsEpics extends RecordEpicsBase<InvoiceItem, number> {
    constructor(protected requests: NgInvoiceItemsRequests, protected notifications: NgInvoiceItemsNotifications) {
        super(requests, INVOICE_ITEMS_REDUX_KEY, notifications);
    }
}
