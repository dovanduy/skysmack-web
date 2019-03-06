import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Invoice, InvoicesAppState } from '@skysmack/packages-invoices';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgInvoicesStore extends NgRecordStore<InvoicesAppState, Invoice, number> {
    constructor(protected ngRedux: NgRedux<InvoicesAppState>) { super(ngRedux, 'invoices'); }
}
