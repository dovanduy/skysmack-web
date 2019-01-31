import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoiceItemsAppState } from '@skysmack/packages-invoices';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsActions extends DocumentRecordActionsBase<InvoiceItemsAppState, NgRedux<InvoiceItemsAppState>> {
    constructor(protected store: NgRedux<InvoiceItemsAppState>) { super(store, 'INVOICE_ITEMS_', ['items']); }
}
