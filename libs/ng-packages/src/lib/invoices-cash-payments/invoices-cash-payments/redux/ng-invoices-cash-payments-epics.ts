import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { CashPayment, INVOICES_CASH_PAYMENTS_REDUX_KEY } from '@skysmack/packages-invoices-cash-payments';
import { NgInvoicesCashPaymentsRequests } from './ng-invoices-cash-payments-requests';
import { NgInvoicesCashPaymentsNotifications } from '../ng-invoices-cash-payments-notifications';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsEpics extends RecordEpicsBase<CashPayment, number> {
    constructor(protected requests: NgInvoicesCashPaymentsRequests, protected notifications: NgInvoicesCashPaymentsNotifications) {
        super(requests, INVOICES_CASH_PAYMENTS_REDUX_KEY, notifications);
    }
}
