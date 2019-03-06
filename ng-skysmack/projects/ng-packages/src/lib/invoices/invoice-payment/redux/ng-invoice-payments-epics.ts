import { NgInvoicePaymentsRequests } from './ng-invoice-payments-requests';
import { InvoicePayment } from '@skysmack/packages-invoices';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgInvoicePaymentsNotifications } from '../ng-invoice-payments-notifications';


@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsEpics extends RecordEpicsBase<InvoicePayment, number> {
    constructor(protected requests: NgInvoicePaymentsRequests, protected notifications: NgInvoicePaymentsNotifications) {
        super(requests, 'INVOICE_PAYMENTS_', notifications);
    }
}
