import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InvoiceItem, InvoiceItemsAppState } from '@skysmack/packages-invoices';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsStore extends NgRecordStore<InvoiceItemsAppState, InvoiceItem, number> {
    constructor(
        protected ngRedux: NgRedux<InvoiceItemsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'invoiceItems'); }
}
