import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Invoice, InvoicesAppState } from '@skysmack/packages-invoices';
import { NgDocumentRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicesStore extends NgDocumentRecordStore<InvoicesAppState, Invoice, number> {
    constructor(protected ngRedux: NgRedux<InvoicesAppState>) { super(ngRedux, 'invoices'); }
}
