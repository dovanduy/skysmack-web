import { NgInvoicePaymentsRequests } from './ng-invoice-payments-requests';
import { InvoicePayment } from '@skysmack/packages-invoices';
import { Injectable } from '@angular/core';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { NgInvoicePaymentsNotifications } from '../ng-invoice-payments-notifications';


@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsEpics extends DocumentRecordEpicsBase<InvoicePayment, number> {
    constructor(protected requests: NgInvoicePaymentsRequests, protected notifications: NgInvoicePaymentsNotifications) {
        super(requests, 'INVOICE_PAYMENTS_', notifications);
    }
}
