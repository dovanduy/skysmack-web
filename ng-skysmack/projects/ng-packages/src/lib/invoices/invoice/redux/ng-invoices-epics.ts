import { NgInvoicesRequests } from './ng-invoices-requests';
import { Invoice, INVOICES_REDUX_KEY } from '@skysmack/packages-invoices';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgInvoicesNotifications } from '../ng-invoices-notifications';


@Injectable({ providedIn: 'root' })
export class NgInvoicesEpics extends RecordEpicsBase<Invoice, number> {
    constructor(protected requests: NgInvoicesRequests, protected notifications: NgInvoicesNotifications) {
        super(requests, INVOICES_REDUX_KEY, notifications);
    }
}
