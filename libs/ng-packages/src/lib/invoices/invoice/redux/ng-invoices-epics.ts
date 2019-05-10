import { NgInvoicesRequests } from './ng-invoices-requests';
import { Invoice, INVOICES_REDUX_KEY } from '@skysmack/packages-invoices';
import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-redux';
import { NgInvoicesNotifications } from '../ng-invoices-notifications';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoiceItemsStore } from '../../invoice-item/redux/ng-invoice-items-store';
import { NgInvoiceItemsActions } from '../../invoice-item';


@Injectable({ providedIn: 'root' })
export class NgInvoicesEpics extends RecordEpicsBase<Invoice, number> {
    constructor(
        protected requests: NgInvoicesRequests,
        protected notifications: NgInvoicesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected invoiceItemsStore: NgInvoiceItemsStore,
        protected invoiceItemsActions: NgInvoiceItemsActions
    ) {
        super(requests, INVOICES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: INVOICES_REDUX_KEY,
                relationIdSelector: 'inventoryId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.invoiceItemsStore,
                actions: this.invoiceItemsActions,
                many: true
            })
        ]);
    }
}
