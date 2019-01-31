import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InvoiceItem, InvoiceItemsAppState } from '@skysmack/packages-invoices';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsStore extends NgDocumentRecordReduxStore<InvoiceItemsAppState, InvoiceItem, number> {
    constructor(protected ngRedux: NgRedux<InvoiceItemsAppState>) { super(ngRedux, 'invoiceItems'); }
}
