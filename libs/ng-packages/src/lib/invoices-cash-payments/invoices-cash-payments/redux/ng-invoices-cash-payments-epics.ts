import { NgInvoicesCashPaymentsRequests } from './ng-invoice-payments-requests';
import { InvoicesCashPayment, INVOICE_PAYMENTS_REDUX_KEY } from '@skysmack/packages-invoices-cash-payments';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgInvoicesCashPaymentsNotifications } from '../ng-invoice-payments-notifications';


@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsEpics extends RecordEpicsBase<InvoicesCashPayment, number> {
    constructor(protected requests: NgInvoicesCashPaymentsRequests, protected notifications: NgInvoicesCashPaymentsNotifications) {
        super(requests, INVOICE_PAYMENTS_REDUX_KEY, notifications);
    }
}
